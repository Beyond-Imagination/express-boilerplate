import { body, checkSchema, validationResult } from 'express-validator'
import camelcaseKeys from 'camelcase-keys'

import { BadRequest } from '@/errors'

export const validation = function (schema) {
  return [
    checkSchema(schema),
    checkValidationResult,
    camelcaseRequest,
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

function camelcaseRequest(req, res, next) {
  req.body = camelcaseKeys(req.body);
  next()
}
