import { NextFunction, Request, Response } from "express";
import XLSX from "xlsx";


class WorkerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        const file = req.file.buffer
        console.log(req.file.mimetype);
        const workbook = XLSX.read(file)
        const data = Object.keys(XLSX.utils.sheet_to_json(workbook.Sheets['Лист1'])[0]!)
        console.log(data);

        return res.json(data)
      }
    } catch (e) {
      next(e)
    }
  }
}

export default WorkerController