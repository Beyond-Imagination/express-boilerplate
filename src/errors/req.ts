import { Result, ValidationError } from 'express-validator'
import Http from '@/errors/http'

export class ReqParamsNotMatchError extends Http {
  constructor (validationError: Result<ValidationError>) {
    const parameters = validationError.array().map(error => error.param).join(', ')
    const message = `파라미터 [${parameters}] 는 반드시 필요합니다.`
    super(400, message)
  }
}
