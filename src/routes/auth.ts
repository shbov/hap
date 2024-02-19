import { Request, Response, Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { body, validationResult } from 'express-validator'

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

authRouter.post('/refresh-token', AuthController.refreshToken)

export default authRouter
