import { Request, Response, Router } from 'express'
import { UserController } from '../controllers/UserController'
import { body, param, validationResult } from 'express-validator'

const usersRouter = Router()

usersRouter.get('/:id', param('id').notEmpty().isNumeric(), async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() })
  }

  const id = Number(req.params.id)
  try {
    const result = await UserController.getById(id)
    return res.status(200).send(result)
  } catch (e) {
    console.error(`[usersRouter::getById] ${e}`)
    return res.status(404).send({ message: 'user not found' })
  }
})

usersRouter.post(
  '/',
  body('name').notEmpty().escape(),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('phone').notEmpty().isMobilePhone('any'),
  body('password').notEmpty().isLength({ min: 8 }),
  async (req: Request, res: Response) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() })
    }

    const payload = req.body
    try {
      const result = await UserController.create(payload)
      return res.status(201).send(result)
    } catch (e) {
      console.error(`[usersRouter::create] ${e}`)
      return res.status(400).send({ message: `${e}` })
    }
  }
)

export default usersRouter
