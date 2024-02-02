import { Response, Request, NextFunction } from 'express'
import { RequestWithBody } from '../types/request-data.ts'
import { UserRequestBody, UserResponseBody } from '../types/user.ts'
import userService from '../services/user-service.js'


class UserController {
  static async authentication(
    req: RequestWithBody<UserRequestBody>,
    res: Response<UserResponseBody>,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body
      const IP = req.ip
      let userData

      if (req.path === '/login') {
        userData = await userService.login(email, password, IP)
      } else {
        userData = await userService.registration(email, password, IP)
      }

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
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

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const result = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json({result})
    } catch (e) {
      return next(e)
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies
      const IP = req.ip
      const userData = await userService.refresh(refreshToken, IP)

      res.cookie('refreshToken', userData.refreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
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
}

export default UserController
