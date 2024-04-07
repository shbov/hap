import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as userDal from '../db/dal/user'
import { errorHelper } from '../helpers/errorHelper'

export class UserController {
  public static async getUserData(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }
    try {
      const user = req.user
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      console.log(`[UserController::getUserData] id: ${user.id}`)
      return res.status(200).send(await userDal.getByIdWithoutCredentials(user.id))
    } catch (e) {
      console.error(`[UserController::getUserData] ${e}`)
      return errorHelper(e, 'UserController::getUserData', 500, res)
    }
  }
}
