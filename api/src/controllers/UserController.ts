import * as userDal from '../db/dal/user'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { errorHelper } from '../helpers/errorHelper'

interface ExtendedRequest extends Request {
  user: {
    id: string
  }
}

export class UserController {
  public static async getUserData(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    const { id } = (req as ExtendedRequest).user
    console.log(`[UserController::getUserData] id: ${id}`)
    try {
      const user = await userDal.getByIdWithoutCredentials(parseInt(id, 10))
      return res.status(200).send(user)
    } catch (e) {
      return errorHelper(e, 'UserController::getUserData', 500, res)
    }
  }
}
