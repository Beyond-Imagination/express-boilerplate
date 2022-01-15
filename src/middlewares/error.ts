import { Request, Response, NextFunction } from 'express'
import { API } from '@/types/api'
import { ErrorJSONFormat, InternalServerError } from '@/errors'

export const errorHandler = (
  error: API.APIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (ErrorJSONFormat.isBodyParserError(error)) {
    error = new ErrorJSONFormat()
  } else if (error instanceof API.APIError === false) {
    console.error("unexpected error occured.", error);
    error = new InternalServerError()
  }
  res.status(error.status).json(error)
}
