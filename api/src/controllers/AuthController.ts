import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import * as userDal from '../db/dal/user'
import { UserInput } from '../db/models/User'
import { errorHelper } from '../helpers/errorHelper'
import { comparePassword, hashPassword } from '../helpers/hashPassword'

const jwtDataOptions = {
  secret: process.env.JWT_SECRET ?? '',
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION
}

export class AuthController {
  public static async signUp(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
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
        return res.status(400).send({ errors: ['Такой номер телефона уже занят'] })
      }

      const user = await userDal.create(userPayload)
      const token = jwt.sign({ id: user.id, name: user.name, image: user.image }, jwtDataOptions.secret, {
        expiresIn: `${jwtDataOptions.jwtExpiration}s`
      })

      return res.status(201).send({
        token
      })
    } catch (e) {
      return errorHelper(e, 'AuthController::signUp', 500, res)
    }
  }

  public static async signIn(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const { phone, password } = req.body
      const user = await userDal.getByPhone(phone)
      if (!user) {
        console.log('[AuthController::signIn] user not found')
        return res.status(400).send({ errors: ['Неверный номер телефона'] })
      }

      const passwordMatch = await comparePassword(password, user.password)
      if (!passwordMatch) {
        console.log('[AuthController::signIn] password not match')
        return res.status(400).send({ errors: ['Неправильный пароль'] })
      }

      const token = jwt.sign({ id: user.id, name: user.name, image: user.image }, jwtDataOptions.secret, {
        expiresIn: `${jwtDataOptions.jwtExpiration}s`
      })

      return res.status(200).send({
        token
      })
    } catch (e) {
      return errorHelper(e, 'AuthController::signIn', 500, res)
    }
  }
}
