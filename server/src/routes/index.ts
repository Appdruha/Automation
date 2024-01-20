import {Router} from "express"
import userRouter from "./userRouter";
import workerRouter from "./workerRouter";

const router = Router()

router.use("/user", userRouter)
router.use("/workers", workerRouter)

export default router
