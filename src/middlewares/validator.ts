import { body, checkSchema, validationResult } from 'express-validator'
import { BadRequest } from '@/errors'

export const validation = function (schema) {
  return [
    checkSchema(schema),
    checkValidationResult,
  ]
}

function checkValidationResult(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array())
  } else {
    next()
  }
}
