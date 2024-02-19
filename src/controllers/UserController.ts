import * as userDal from '../db/dal/user'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class UserController {
  public static async getUserData(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    // @ts-ignore
    const { id } = req.user
    console.log(`[UserController::getUserData] id: ${id}`)
    try {
      const user = await userDal.getByIdWithoutCredentials(parseInt(id, 10))
      return res.status(200).send(user)
    } catch (e) {
      console.error(`[UserController::getUserData] ${e}`)
      return res.status(500).send({ message: 'internal server error' })
    }
  }
}
