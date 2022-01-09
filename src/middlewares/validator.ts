import { body, checkSchema, validationResult } from 'express-validator'

export const validation = function (schema) {
  return [
    checkSchema(schema),
    checkValidationResult,
  ]
}

function checkValidationResult(req, res, next) {
  // TODO Error format 적용
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    throw errors
  } else {
    next()
  }
}
