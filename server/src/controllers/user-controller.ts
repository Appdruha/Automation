import { Response, NextFunction } from 'express'
import { RequestWithBody } from '../types/request-data.ts'
import { UserRequestBody, UserResponseBody } from '../types/user.ts'
import UserService from '../services/user-service.js'

class UserController {
  static async authentication(
    req: RequestWithBody<UserRequestBody>,
    res: Response<UserResponseBody>,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body
      let userData

      if (req.path === '/login') {
        userData = await UserService.login(email, password)
      } else {
        userData = await UserService.registration(email, password)
      }

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: '/',
      })

      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      return next(e)
    }
  }

  static async check() {
    try {
    } catch {}
  }
}

export default UserController
