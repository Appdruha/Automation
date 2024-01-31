import ApiError from '../errors/api-error.ts'
import { Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RequestBody } from '../types/request-data.ts'
import { UserRequestBody, UserResponseBody } from '../types/user.ts'
import User from '../db/models/user.ts'

type Token = 'access' | 'refresh'

const generateJwt = (id: number, email: string, token: Token) => {
  let key: string = process.env.SECRET_KEY
  let expirationTime: string = '16h'

  if (token === 'refresh') {
    key = process.env.REFRESH_KEY
    expirationTime = '30d'
  }

  return jwt.sign({ id, email }, key, { expiresIn: expirationTime })
}

class UserController {
  static async registration(req: RequestBody<UserRequestBody>, res: Response<UserResponseBody>, next: NextFunction) {
    try {
      const { email, password, rememberMe } = req.body
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })
      const accessToken = generateJwt(user.id, user.email, 'access')

      if (rememberMe) {
        const refreshToken = generateJwt(user.id, user.email, 'refresh')
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
      }

      return res.json({
        accessToken: accessToken,
        id: user.id
      })
    } catch {
      return next(ApiError.internal('Ошибка при регистрации пользователя'))
    }
  }
}

export default UserController
