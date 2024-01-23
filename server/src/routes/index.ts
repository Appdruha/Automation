import { Router } from 'express'
import userRouter from './user-router.js'
import workerRouter from './worker-router.js'

const router = Router()

router.use('/user', userRouter)
router.use('/workers', workerRouter)

export default router
