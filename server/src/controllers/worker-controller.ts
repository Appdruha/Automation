import { NextFunction, Request, Response } from 'express'
import WorkerService from '../services/worker-service.js'
import { RequestWithBody } from '../types/request-data.js'
import { WorkerData } from '../types/worker.js'
import ApiError from '../errors/api-error.js'

class WorkerController {
  static async createMany(
    req: Request,
    res: Response<WorkerData[]>,
    next: NextFunction,
  ) {
    try {
      if (req.file) {
        const file = req.file.buffer
        const workers = await WorkerService.createWithFile(file, 6)
        return res.json(workers)
      } else {
        next(ApiError.badRequest('Файл не обнаружен'))
      }
    } catch (e) {
      next(e)
    }
  }

  static async create(req: RequestWithBody<WorkerData>, res: Response<WorkerData>, next: NextFunction){
    try {
      const workerData = req.body
      const worker = await WorkerService.create(workerData, 6)
      return res.json(worker)
    } catch (e) {
      next(e)
    }
  }

  static async getAll(req: Request, res: Response<WorkerData[]>, next: NextFunction) {
    try {
      const workers = await WorkerService.getAll(6)
      return res.json(workers)
    } catch (e) {
      next(e)
    }
  }

  static async remove(req: Request, res: Response<{ deletionCode: number }>, next: NextFunction) {
    try {
      const { personNumber } = req.params
      const deletionCode = await WorkerService.remove(personNumber, 6)
      return res.json({ deletionCode })
    } catch (e) {
      next(e)
    }
  }

  static async edit(req: RequestWithBody<WorkerData>, res: Response<WorkerData>, next: NextFunction) {
    try {
      const workerData = req.body
      const worker = await WorkerService.edit(workerData, 6)
      return res.json(worker)
    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController
