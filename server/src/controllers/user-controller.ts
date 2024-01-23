import ApiError from '../errors/api-error.js'
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RequestBody } from '../types/request-response.js'
import { AuthRequestBody } from '../types/user.js'
import { User } from '../db/models.js'

type Token = 'jwt' | 'refresh'

const generateJwt = (id: number, email: string, token: Token) => {
  let key: string = process.env.SECRET_KEY
  let expiration: string = '1d'

  if (token === 'refresh') {
    key = process.env.REFRESH_KEY
    expiration = '30d'
  }

  return jwt.sign({ id, email }, key, { expiresIn: expiration })
}

class UserController {
  async registration(req: RequestBody<AuthRequestBody>, res: Response, next: NextFunction) {
    try {
      const { email, password, rememberMe } = req.body
      const hashPassword = await bcrypt.hash(password, 5)
      const user = User
    } catch (e) {}
  }
}