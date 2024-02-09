import { Router } from 'express'
import fileUploadMiddleware from '../middlewares/file-upload-middleware.js'
import WorkerController from '../controllers/worker-controller.ts'
import checkIsAuthorized from '../middlewares/check-authorization-middleware.js'

const workerRouter = Router()

workerRouter.post(
  '/createMany',
  checkIsAuthorized,
  fileUploadMiddleware.single('file'),
  WorkerController.createMany,
)
workerRouter.post('/create', checkIsAuthorized, WorkerController.create)
//@ts-ignore
workerRouter.get('/list', checkIsAuthorized, WorkerController.list)
workerRouter.delete('/:personNumber/remove', checkIsAuthorized, WorkerController.remove)
workerRouter.put('/:personNumber/edit', checkIsAuthorized, WorkerController.edit)

export default workerRouter
