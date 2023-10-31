import { NextFunction, Request, RequestHandler, Response } from 'express'

export const TryCatchHandler = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
