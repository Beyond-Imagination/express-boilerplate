import { API } from '@/types/api'

export class ErrorExistUserEmail extends API.APIError {
  constructor () {
    super(400, 4100, "exist user email")
  }
}
