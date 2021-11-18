import { Request, Response, NextFunction } from 'express'
import Http from '@/errors/http'
import { API } from '@/types/api'
import { failed } from '@/helpers/response'

export const errorHandler = (
  error: Http,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || error.status || 500
  const item: API.Response = {
    status,
    message: error.message,
    success: false,
    result: null
  }
  
  failed(res, item)
}
