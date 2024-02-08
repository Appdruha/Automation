import { NextFunction, Request, Response } from "express";
import WorkerService from "../services/worker-service.js";
import { RequestWithBody } from '../types/request-data.js'
import { WorkerData } from '../types/worker.js'


class WorkerController {
  static async create(req: RequestWithBody<WorkerData>, res: Response<WorkerData[]>, next: NextFunction) {
    try {
      if (req.file) {
        const file = req.file.buffer
        const workersData = await WorkerService.createWithFile(file, 6)
        return res.json(workersData)
      } else {
        const worker = req.body
        const workersData = await WorkerService.create(worker, 6)
        return res.json(workersData)
      }
    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController