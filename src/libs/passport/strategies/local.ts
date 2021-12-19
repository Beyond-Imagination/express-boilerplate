import { Strategy } from "passport-local"

import { User } from '@/models/user'

export const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, 
  async (email, password, done) => {
    try {
      let user = await User.findByEmail(email);
      if (!user) {
        return done(null, false, { message: '유저정보를 찾을 수 없습니다.' })
      } else if (!user.checkPassword(password)) {
        return done(null, false, { message: '올바르지 않은 비밀번호 입니다.' })
      } else {
        return done(null, user, { message: 'login success' })
      }
    } catch (e) {
      return done(e, false, { message: 'internal server error' })
    }
  }
)
