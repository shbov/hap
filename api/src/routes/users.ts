import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { isAuthenticated } from '../middlewares/isAuthenticated'

const usersRouter = Router()

usersRouter.get('/profile', isAuthenticated, UserController.getUserData)

export default usersRouter
