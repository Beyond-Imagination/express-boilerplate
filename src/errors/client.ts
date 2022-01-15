import { ValidationError } from 'express-validator'
import { API } from '@/types/api'

export class BadRequest extends API.APIError {
  errors: ValidationError[]

  constructor (errors: ValidationError[]) {
    super(400, 4000, "bad request")
    this.errors = errors
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      errors: this.errors,
    }
  }
}

export class ErrorJSONFormat extends API.APIError {
  constructor () {
    super(400, 4001, "invalid json format")
  }

  static isBodyParserError(object: unknown): boolean {
    return Object.prototype.hasOwnProperty.call(object, "expose")
      && Object.prototype.hasOwnProperty.call(object, "statusCode")
      && Object.prototype.hasOwnProperty.call(object, "status")
      && Object.prototype.hasOwnProperty.call(object, "body")
      && Object.prototype.hasOwnProperty.call(object, "type");
  }
}
