import { Router } from 'express'
import { UserController } from '../controllers/UserController'

import { verifyTokenMiddleware } from '../middlewares/verifyTokenMiddleware'

const usersRouter = Router()

usersRouter.get('/profile', verifyTokenMiddleware, UserController.getUserData)

export default usersRouter
