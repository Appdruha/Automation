import { Request } from 'express'
import * as core from 'express-serve-static-core'

export type RequestWithBody<T, P = core.ParamsDictionary> = Request<P, any, T>
