import { Request } from 'express'
import * as core from 'express-serve-static-core'

export interface BaseQueryParams{
    page: string
    limit: string
}

export interface UserData{
    email: string
    userId: string
}

export type RequestWithBody<T, P = core.ParamsDictionary> = Request<P, any, T, any>

export type RequestWithQuery<T, P = core.ParamsDictionary> = Request<P, any, any, T, UserData>
