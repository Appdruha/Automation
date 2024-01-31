import { Router } from 'express'
import UserController from "../controllers/user-controller.ts";

const userRouter = Router()

userRouter.post('/registration', UserController.registration)

export default userRouter