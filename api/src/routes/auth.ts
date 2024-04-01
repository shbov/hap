import { Router } from 'express'
import { body } from 'express-validator'

import { AuthController } from '../controllers/AuthController'

const authRouter = Router()

authRouter.post(
  '/sign-in',
  body('password').notEmpty(),
  body('phone').notEmpty().isMobilePhone('any'),
  AuthController.signIn
)

authRouter.post(
  '/sign-up',
  body('name').notEmpty().escape(),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('phone').notEmpty().isMobilePhone('any'),
  body('password').notEmpty().isLength({ min: 8 }),
  AuthController.signUp
)

export default authRouter
