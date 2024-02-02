import { Router } from 'express'
import WorkerController from "../controllers/worker-controller.js";

const workerRouter = Router()

workerRouter.post('/create', WorkerController.create)

export default workerRouter