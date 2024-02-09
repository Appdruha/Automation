import { NextFunction, Request, Response } from 'express'
import WorkerService from '../services/worker-service.js'
import { BaseQueryParams, RequestWithBody, RequestWithQuery } from '../types/request-data.js'
import { WorkerData } from '../types/worker.js'
import ApiError from '../errors/api-error.js'
import { TokenPayload } from '../types/token.js'

class WorkerController {
  static async createMany(
    req: Request,
    res: Response<WorkerData[]>,
    next: NextFunction,
  ) {
    try {
      const {id} = req.app.locals.user as TokenPayload
      if (req.file) {
        const file = req.file.buffer
        const workers = await WorkerService.createWithFile(file, id)
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
      const {id} = req.app.locals.user as TokenPayload
      const workerData = req.body
      const worker = await WorkerService.create(workerData, id)
      return res.json(worker)
    } catch (e) {
      next(e)
    }
  }

  static async list(req: RequestWithQuery<BaseQueryParams>, res: Response<WorkerData[]>, next: NextFunction) {
    try {
      const {id} = req.app.locals.user as TokenPayload
      const {page, limit} = req.query
      const workers = await WorkerService.list(id, parseInt(page), parseInt(limit))
      return res.json(workers)
    } catch (e) {
      next(e)
    }
  }

  static async remove(req: Request, res: Response<{ deletionCode: number }>, next: NextFunction) {
    try {
      const {id} = req.app.locals.user as TokenPayload
      const { personNumber } = req.params
      const deletionCode = await WorkerService.remove(personNumber, id)
      return res.json({ deletionCode })
    } catch (e) {
      next(e)
    }
  }

  static async edit(req: RequestWithBody<WorkerData>, res: Response<WorkerData>, next: NextFunction) {
    try {
      const {id} = req.app.locals.user as TokenPayload
      const workerData = req.body
      const worker = await WorkerService.edit(workerData, id)
      return res.json(worker)
    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController
