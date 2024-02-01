import ApiError from '../errors/api-error.ts'
import { Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RequestWithBody } from '../types/request-data.ts'
import { UserRequestBody, UserResponseBody } from '../types/user.ts'
import User from '../db/models/user.ts'
import { where } from 'sequelize'

type Token = 'ACCESS' | 'REFRESH'

const generateJwt = (id: number, email: string, token: Token) => {
  let key: string = process.env.SECRET_KEY
  let expirationTime: string = '16h'

  if (token === 'REFRESH') {
    key = process.env.REFRESH_KEY
    expirationTime = '30d'
  }

  return jwt.sign({ id, email }, key, { expiresIn: expirationTime })
}

class UserController {
  static async authentication(
    req: RequestWithBody<UserRequestBody>,
    res: Response<UserResponseBody>,
    next: NextFunction,
  ) {
    try {
      const { email, password, rememberMe } = req.body
      let user

      if (req.path === '/login') {
        user = await User.findOne({ where: { email } })

        if (!user) {
          return next(ApiError.notFound('Пользователь с таким email не найден'))
        }

        const comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
          return next(ApiError.badRequest('Неверный пароль'))
        }
      } else {
        const hashPassword = await bcrypt.hash(password, 5)
        user = await User.create({ email, password: hashPassword })
      }

      const accessToken = generateJwt(user.id, user.email, 'ACCESS')

      if (rememberMe) {
        const refreshToken = generateJwt(user.id, user.email, 'REFRESH')
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: '/',
        })
      }

      return res.json({
        accessToken: accessToken,
        id: user.id,
      })
    } catch {
      return next(ApiError.badRequest('Ошибка при создании или поиске пользователя'))
    }
  }
}

export default UserController
