import { Request, Response } from 'express'
import AuthToken from '../db/models/AuthToken'
import { UserInput } from '../db/models/User'
import jwt from 'jsonwebtoken'
import { comparePassword, hashPassword } from '../helpers/hashPassword'
import * as userDal from '../db/dal/user'
import * as authTokenDal from '../db/dal/authToken'

import { validationResult } from 'express-validator'
import { errorHelper } from '../helpers/errorHelper'

const jwtDataOptions = {
  secret: process.env.JWT_SECRET ?? '',
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION
}

export class AuthController {
  public static async signUp(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    try {
      const { name, email, phone, password } = req.body
      const userPayload = {
        name,
        email,
        phone,
        password: await hashPassword(password)
      } as UserInput

      const emailExists = await userDal.getByEmail(userPayload.email)
      if (emailExists) {
        console.log('[AuthController::signUp] email already is use')
        return res.status(400).send({ errors: ['email already is use'] })
      }

      const phoneExists = await userDal.getByPhone(userPayload.phone)
      if (phoneExists) {
        console.log('[AuthController::signUp] phone already is use')
        return res.status(400).send({ errors: ['phone already is use'] })
      }

      const user = await userDal.create(userPayload)
      return res.status(201).send(user)
    } catch (e) {
      return errorHelper(e, 'AuthController::signUp', 500, res)
    }
  }

  public static async signIn(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    try {
      const { phone, password } = req.body
      const user = await userDal.getByPhone(phone)
      if (!user) {
        console.log('[AuthController::signIn] user not found')
        return res.status(400).send({ errors: ['user not found'] })
      }

      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        console.log('[AuthController::signIn] password not match')
        return res.status(400).send({ errors: ['password not match'] })
      }

      const token = jwt.sign({ id: user.id }, jwtDataOptions.secret, {
        expiresIn: `${jwtDataOptions.jwtExpiration}s`
      })

      const refreshToken = await AuthToken.createToken(user)
      return res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
        refreshToken
      })
    } catch (e) {
      return errorHelper(e, 'AuthController::signIn', 500, res)
    }
  }

  public static async refreshToken(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    const { refreshToken: requestToken } = req.body
    if (requestToken == null) {
      return res.status(403).send({ errors: ['Refresh Token is required!'] })
    }

    try {
      const refreshToken = await authTokenDal.getByToken(requestToken)
      if (!refreshToken) {
        return res.status(403).send({ errors: ['Invalid refresh token'] })
      }

      if (AuthToken.verifyExpiration(refreshToken)) {
        await AuthToken.destroy({ where: { id: refreshToken.id } })
        return res.status(403).send({ errors: ['Refresh token expired'] })
      }

      const user = await userDal.getByIdWithoutCredentials(refreshToken.user)
      if (!user) {
        return res.status(403).send({
          errors: ['User not found']
        })
      }

      const newAccessToken = jwt.sign({ id: user.id }, jwtDataOptions.secret, {
        expiresIn: `${jwtDataOptions.jwtExpiration}s`
      })

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token
      })
    } catch (e) {
      return errorHelper(e, 'AuthController::refreshToken', 500, res)
    }
  }
}
