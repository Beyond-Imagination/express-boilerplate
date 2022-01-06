export namespace API {
  export interface Response {
    message: string | null
    success: boolean
    status: number
    result: any
  }

  export class APIError extends Error {
    status: number
    code: number
    message: string

    constructor (statusCode: number, errorCode: number, message: string) {
      super(message)

      this.status = statusCode
      this.code = errorCode
      this.message = message
    }

    toJSON(){
      return {
        code: this.code,
        message: this.message,
      }
    }
  }
}
