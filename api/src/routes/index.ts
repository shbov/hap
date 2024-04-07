import { Router } from 'express'

import authRouter from './auth'
import eventRouter from './event'
import usersRouter from './users'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/event', eventRouter)

export default router
