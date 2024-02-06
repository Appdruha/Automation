import ApiError from "../errors/api-error.ts";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";

const apiErrorHandler = (err: any, req: Request, res: Response<{ message: string }>, next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  } else if (err instanceof MulterError) {
    return res.status(404).json({message: err.message})
  } else {
    return res.status(500).json({ message: err.message || 'Непредвиденная ошибка' })
  }
}

export default apiErrorHandler

