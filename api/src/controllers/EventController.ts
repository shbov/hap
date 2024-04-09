import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as eventDal from '../db/dal/event'
import * as userDal from '../db/dal/user'

export class EventController {
  public static async getUserEvents(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      console.log(`[EventController::getUserEvents] id: ${user}`)
      const events = await userDal.getUserEvents(user)
      return res.status(200).send({
        events: events
      })
    } catch (e) {
      return next(e)
    }
  }

  public static async createEvent(req: Request, res: Response, next: NextFunction) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      const { name, description, image } = req.body
      console.log(`[EventController::createEvent] id: ${user}`)
      const event = await eventDal.createEvent(user, name, description, image)

      return res.status(200).send({
        event: event
      })
    } catch (e) {
      return next(e)
    }
  }
}
