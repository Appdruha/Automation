import jwt from 'jsonwebtoken'

class TokenService {
  generateTokens(payload: { email: string; id: number }) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: '14d' })
    return { accessToken, refreshToken }
  }
}

export default new TokenService()