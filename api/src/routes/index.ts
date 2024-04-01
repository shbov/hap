import { Router } from 'express'

import authRouter from './auth'
import usersRouter from './users'

const router = Router()

router.use('/users', usersRouter)
router.use('/auth', authRouter)

export default router
