import { Router } from 'express'
import fileUploadMiddleware from "../middlewares/file-upload-middleware.js";
import WorkerController from "../controllers/worker-controller.ts";

const workerRouter = Router()

workerRouter.post('/createMany', fileUploadMiddleware.single('file'), WorkerController.createMany)
workerRouter.post('/create', WorkerController.create)
workerRouter.get('/getAll', WorkerController.getAll)
workerRouter.delete('/:personNumber/remove', WorkerController.remove)
workerRouter.put('/:personNumber/edit', WorkerController.edit)

export default workerRouter