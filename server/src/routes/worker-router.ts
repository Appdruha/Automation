import { Router } from 'express'
import fileUploadMiddleware from "../middlewares/file-upload-middleware.js";
import WorkerController from "../controllers/worker-controller.ts";

const workerRouter = Router()

workerRouter.post('/create', fileUploadMiddleware.single('file'), WorkerController.create)

export default workerRouter