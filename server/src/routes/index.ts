import {Router} from "express"
import userRouter from "./user-router";
import workerRouter from "./worker-router";

const router = Router()

router.use("/user", userRouter)
router.use("/workers", workerRouter)

export default router
