import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import * as eventDal from '../db/dal/event'
import * as userDal from '../db/dal/user'
import { errorHelper } from '../helpers/errorHelper'

export class EventController {
  public static async getUserEvents(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.user
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      console.log(`[EventController::getUserEvents] id: ${user.id}`)
      const events = await userDal.getUserEvents(user.id)
      // const [previousEvents, ongoingEvents] = _.partition(events, (event) => event.datetime < currentTime)
      //
      // console.log('Events before now:', eventsBeforeNow)
      // console.log('Events after now:', eventsAfterNow)

      return res.status(200).send({
        events: events
      })
    } catch (e) {
      console.error(`[EventController::getUserEvents] ${e}`)
      return errorHelper(e, 'UserController::getUserData', 500, res)
    }
  }

  public static async createEvent(req: Request, res: Response): Promise<Response> {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() })
    }

    try {
      const user = req.user
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized!' })
      }

      const { name, description, image } = req.body
      console.log(`[EventController::createEvent] id: ${user.id}`)
      const event = await eventDal.createEvent(user.id, name, description, image)

      return res.status(200).send({
        event: event
      })
    } catch (e) {
      console.error(`[EventController::createEvent] ${e}`)
      return errorHelper(e, 'UserController::getUserData', 500, res)
    }
  }
}
