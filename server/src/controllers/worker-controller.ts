import { NextFunction, Request, Response } from "express";
import XLSX from "xlsx";
import Worker from "../db/models/worker.js";
import WorkerService from "../services/worker-service.js";


class WorkerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        const file = req.file.buffer
        const workersData = await WorkerService.create(file, 6)
        return res.json(workersData)
      } else return res.json({mess: 'working'})
    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController