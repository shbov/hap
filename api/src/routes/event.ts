import { Router } from 'express'
import { body } from 'express-validator'

import { EventController } from '../controllers/EventController'
import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware'

const eventRouter = Router()

eventRouter.get('/', verifyTokenMiddleware, EventController.getUserEvents)

export default eventRouter
