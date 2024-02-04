import multer, { FileFilterCallback, memoryStorage } from 'multer'
import ApiError from '../errors/api-error.js'
import { Request } from 'express'

export const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(ApiError.badRequest('Поддерживается только .xlsx формат файлов'))
  }
}

export default multer({
  storage: memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 10000,
    files: 1,
    fieldNameSize: 1000,
    fields: 1,
    fieldSize: 100000000,
    parts: 100,
  },
})
