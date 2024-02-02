import { NextFunction, Request, Response } from "express";


class WorkerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {

    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController