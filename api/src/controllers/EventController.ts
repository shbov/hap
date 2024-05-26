import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as eventDal from '../db/dal/event'
import * as intervalDal from '../db/dal/interval'
import * as userDal from '../db/dal/user'

export class EventController {
  public static async getUserEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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

  public static async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      const { name, description, image, intervals } = req.body

      console.log(`[EventController::createEvent] id: ${user}`)
      const event = await eventDal.createEvent(user, name, description, image)

      for (const interval of intervals) {
        console.log(
          `[EventController::createEvent] interval: ${interval.start} ${interval.end}`
        )

        const createdInterval = await intervalDal.create(interval)
        await event.attachInterval(createdInterval)
      }

      return res.status(200).send({
        event: event
      })
    } catch (e) {
      return next(e)
    }
  }

  public static async sendInvite(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.userId
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      const { eventId, userId } = req.body
      console.log(`[EventController::sendInvite] id: ${user}`)
      await eventDal.sendInvite(eventId, userId)

      return res.status(200).send({
        message: 'Invite sent'
      })
    } catch (e) {
      return next(e)
    }
  }
}
