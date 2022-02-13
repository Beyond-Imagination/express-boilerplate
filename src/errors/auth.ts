import { API } from '@/types/api'

export class ErrorExistUserEmail extends API.APIError {
  constructor () {
    super(400, 4100, "exist user email")
  }
}

export class ErrorNotExistUserEmail extends API.APIError {
  constructor () {
    super(401, 4101, "not exist user email")
  }
}

export class ErrorInvalidPassword extends API.APIError {
  constructor () {
    super(401, 4102, "invalid password")
  }
}
