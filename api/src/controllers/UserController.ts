import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as userDal from '../db/dal/user'

export class UserController {
  public static async getUserData(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      console.log(`[UserController::getUserData] id: ${user}`)
      return res.status(200).send(await userDal.getByIdWithoutCredentials(user))
    } catch (e) {
      return next(e)
    }
  }
}
