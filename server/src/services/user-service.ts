import bcrypt from 'bcryptjs'
import User from '../db/models/user.ts'
import TokenService from './token-service.ts'
import UserDto from '../dtos/user-dto.ts'
import ApiError from '../errors/api-error.ts'
import { where } from 'sequelize'
import tokenService from './token-service.ts'

class UserService {
  async registration(email: string, password: string, IP?: string, registrationKey?: string) {
    if (registrationKey !== process.env.REGISTRATION_KEY) {
      throw ApiError.badRequest(`Неверный ключ для регистрации`)
    }

    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword })
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken, IP)

    return { ...tokens, user: userDto }
  }

  async login(email: string, password: string, IP: string | undefined) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw ApiError.notFound(`Пользователь с почтовым адресом ${email} не найден`)
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      throw ApiError.badRequest('Неверный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken, IP)

    return { ...tokens, user: userDto }
  }

  async refresh(refreshToken: string | undefined, IP: string | undefined) {
    if (!refreshToken) {
      throw ApiError.unauthorized('Не авторизован')
    }

    const tokenPayload = tokenService.verifyToken(refreshToken, 'REFRESH')
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!tokenPayload || !tokenFromDb) {
      throw ApiError.unauthorized('Не авторизован')
    }

    const tokens = tokenService.generateTokens({ id: tokenPayload.id, email: tokenPayload.email })
    await tokenService.saveToken(tokenPayload.id, tokens.refreshToken, IP)

    return { ...tokens, user: { id: tokenPayload.id, email: tokenPayload.email } }
  }

  async logout(refreshToken: string) {
    return tokenService.removeToken(refreshToken)
  }
}

export default new UserService()
