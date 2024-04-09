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

      const friends = await userDal.getUserFriends(user)
      return res.status(200).send({
        user: await userDal.getByIdWithoutCredentials(user),
        events: (await userDal.getUserEvents(user))?.length ?? 0,
        friends: friends?.length ?? 0
      })
    } catch (e) {
      return next(e)
    }
  }

  public static getNotifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      console.log(`[UserController::getNotifications] id: ${user}`)

      return res.status(200).send({
        notifications: await userDal.getNotifications(user)
      })
    } catch (e) {
      return next(e)
    }
  }
}
