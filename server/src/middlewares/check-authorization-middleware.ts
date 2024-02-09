import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/api-error.js'
import jwt from 'jsonwebtoken'
import { TokenPayload } from '../types/token.js'
import fileUploadMiddleware from '../middlewares/file-upload-middleware.js'

function checkIsAuthorized(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.authorization) {
      next(ApiError.unauthorized('Не обнаружен заголовок authorization'))
    }

    const accessToken = req.headers.authorization!.split(' ')[1]
    if (!accessToken) {
        next(ApiError.unauthorized('Не обнаружен access token'))
    }

    try {
      req.app.locals.user = jwt.verify(accessToken, process.env.SECRET_KEY) as TokenPayload
    } catch {
      next(ApiError.unauthorized('Невалидный токен'))
    }

    next()
  } catch (e) {
    next(ApiError.unauthorized('Ошибка при проверке токена'))
  }
}

export default checkIsAuthorized