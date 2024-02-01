import bcrypt from 'bcryptjs'
import User from '../db/models/user.js'
import TokenService from './token-service.js'
import UserDto from '../dtos/user-dto.js'
import ApiError from '../errors/api-error.js'
import { where } from 'sequelize'

class UserService {
  async registration(email: string, password: string) {
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw ApiError.badRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword })
    const userDto = new UserDto(user)
    const tokens = TokenService.generateTokens({ ...userDto })

    return { ...tokens, user: userDto }
  }

  async login(email: string, password: string) {
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

    return { ...tokens, user: userDto }
  }
}

export default new UserService()