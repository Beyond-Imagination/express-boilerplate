import { API } from '@/types/api'

export class InternalServerError extends API.APIError {
  constructor () {
    super(500, 5000, "internal server error")
  }
}
