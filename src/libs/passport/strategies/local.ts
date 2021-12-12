import { Strategy } from "passport-local"

import { User, IUser } from '@/models/user'
import { comparePassword } from '@/helpers/password'

export const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  let user : IUser | null = null

  try {
    user = await User.findOne({email: email}).exec();
  } catch (e) {
    return done(e, false, { message: 'internal server error' })
  }

  if (!user) {
    return done(null, false, { message: '유저정보를 찾을 수 없습니다.' })
  }

  if (!comparePassword(password, user.password || '')) {
    return done(null, false, { message: '올바르지 않은 비밀번호 입니다.' })
  }

  return done(null, {email: user.email, nickname: user.nickname, type: user.type}, { message: 'login success' })
})
