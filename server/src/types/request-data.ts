import { Request } from 'express'

export type RequestWithBody<T> = Request<unknown, unknown, T>
