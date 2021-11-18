import Http from '@/errors/http'

export class AlreadyUsingUserIdError extends Http {
  constructor (userId: string) {
    super(400, `[${userId}] 는 이미 사용중인 아이디 입니다.`)
  }
}

export class NoUserError extends Http {
  constructor () {
    super(401, '사용자 정보를 찾을 수 없습니다.')
  }
}

export class NotAuthenticated extends Http {
  constructor () {
    super(403, '로그인이 되어있지 않습니다.')
  }
}
