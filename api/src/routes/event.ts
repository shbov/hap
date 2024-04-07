import { Router } from 'express'

import { EventController } from '../controllers/EventController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const eventRouter = Router()

eventRouter.get('/', isAuthenticated, EventController.getUserEvents)

export default eventRouter
