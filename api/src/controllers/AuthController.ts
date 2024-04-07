import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import ms from 'ms'

import * as refreshTokenDal from '../db/dal/refreshToken'
import * as userDal from '../db/dal/user'
import { UserInput } from '../db/models/User'
import { comparePassword, hashPassword } from '../helpers/hashPassword'
import { clearTokens } from '../utils/clearTokens'
import { generateJWT } from '../utils/generateJWT'

class AuthController {
  public static async signUp(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ message: result.array() })
    }

    try {
      const { name, phone, password } = req.body
      const userPayload = {
        name,
        phone,
        password: await hashPassword(password),
        image: req.file?.filename
      } as UserInput
      const phoneExists = await userDal.getByPhone(userPayload.phone)
      if (phoneExists) {
        console.log('[AuthController::signUp] phone already is use')
        return res.status(400).send({ message: ['Такой номер телефона уже занят'] })
      }

      const user = await userDal.create(userPayload)
      req.userId = user.id

      return next()
    } catch (e) {
      return next(e)
    }
  }

  public static async signIn(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ message: result.array() })
    }

    try {
      const { phone, password } = req.body
      const user = await userDal.getByPhone(phone)
      if (!user) {
        console.log('[AuthController::signIn] user not found')
        return res.status(400).send({ message: ['Неверный номер телефона'] })
      }

      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        console.log('[AuthController::signIn] password not match')
        return res.status(400).send({ message: ['Неправильный пароль'] })
      }

      req.userId = user.id
      return next()
    } catch (e) {
      return next(e)
    }
  }

  public static async logout(req: Request, res: Response, next: NextFunction) {
    await clearTokens(req, res, next)
    return res.sendStatus(204)
  }

  public static async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
    const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE } = process.env

    const { signedCookies } = req
    const { refreshToken } = signedCookies
    if (!refreshToken) {
      return res.sendStatus(204)
    }

    try {
      const refreshTokenInDB = await refreshTokenDal.getRefreshToken(refreshToken)
      if (!refreshTokenInDB) {
        await clearTokens(req, res, next)
        throw createError.Unauthorized()
      }

      try {
        const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET!) as { userId: number }
        const { userId } = decodedToken
        const user = await userDal.getById(userId)
        if (!user) {
          await clearTokens(req, res, next)
          throw createError('Invalid credentials')
        }

        const accessToken = generateJWT(user.id, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)
        return res.status(200).json({
          user,
          accessToken,
          expiresAt: new Date(Date.now() + ms(ACCESS_TOKEN_LIFE!))
        })
      } catch (error) {
        return next(error)
      }
    } catch (error) {
      return next(error)
    }
  }
}

export default AuthController
