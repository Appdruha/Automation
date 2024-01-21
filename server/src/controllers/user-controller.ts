import ApiError from "../errors/api-error";
import {Request, Response, NextFunction} from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

type Token = "jwt" | "refresh"

const generateJwt = (id: number, email: string, token: Token) => {
    let key: string = process.env.SECRET_KEY
    let expiration: string = "1d"

    if (token === "refresh") {
        key = process.env.REFRESH_KEY
        expiration = "30d"
    }

    return jwt.sign(
        {id, email},
        key,
        {expiresIn: expiration}
    )
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password, rememberMe} = req.body
            console.log(email)
        } catch (e) {

        }
    }
}