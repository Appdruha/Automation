import { Router } from 'express'
import UserController from "../controllers/user-controller.ts";

const userRouter = Router()

userRouter.post('/registration', UserController.authentication)
userRouter.post('/login', UserController.authentication)

export default userRouter