import { Router } from 'express'
import userRouter from './user-router.ts'
import workerRouter from './worker-router.ts'

const router = Router()

router.use('/user', userRouter)
router.use('/workers', workerRouter)

export default router
