import { Router } from 'express'
import { body } from 'express-validator'
import multer from 'multer'

import AuthController from '../controllers/AuthController'
import { generateAuthTokens } from '../middlewares/generateAuthTokens'

const authRouter = Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split('/')
    const extension = extArray[extArray.length - 1]

    cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
})
const upload = multer({
  storage: storage,
  limits: { fieldSize: 25 * 1024 * 1024 }
})

authRouter.post(
  '/sign-in',
  body('password').notEmpty(),
  body('phone').notEmpty().isMobilePhone('any'),
  AuthController.signIn,
  generateAuthTokens
)

authRouter.post(
  '/logout',
  body('password').notEmpty(),
  body('phone').notEmpty().isMobilePhone('any'),
  AuthController.logout
)

authRouter.post(
  '/sign-up',
  upload.single('image'),
  body('name').notEmpty().escape(),
  body('phone').notEmpty().isMobilePhone('any'),
  body('password').notEmpty().isLength({ min: 8 }),
  AuthController.signUp,
  generateAuthTokens
)

authRouter.post('/refresh', AuthController.refreshAccessToken)

export default authRouter
