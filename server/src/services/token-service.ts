import jwt from 'jsonwebtoken'
import Session from '../db/models/session.ts'
import ApiError from '../errors/api-error.ts'
import { TokenPayload } from '../types/token.js'

type Token = 'ACCESS' | 'REFRESH'

class TokenService {
  generateTokens(payload: { email: string; id: number }) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: '14d' })
    return { accessToken, refreshToken }
  }

  async removeToken(refreshToken: string) {
    return Session.destroy({ where: { refresh: refreshToken } })
  }

  async findToken(refreshToken: string) {
    return Session.findOne({ where: { refresh: refreshToken } })
  }

  verifyToken(token: string, type: Token) {
    try {
      let secret
      if (type === 'ACCESS') {
        secret = process.env.SECRET_KEY
      } else {
        secret = process.env.REFRESH_KEY
      }

      return  jwt.verify(token, secret) as TokenPayload
    } catch {
      return null
    }
  }

  async saveToken(userId: number, refreshToken: string, IP?: string) {
    try {
      const sessionData = await Session.findOne({ where: { userId } })
      if (sessionData) {
        sessionData.refresh = refreshToken
        return sessionData.save()
      }
      console.log(IP? IP: null)
      return Session.create({ userId, refresh: refreshToken, IP: (IP? IP: null) })
    } catch {
      throw ApiError.badRequest(`Пользователя с id ${userId} не существует`)
    }
  }
}

export default new TokenService()
