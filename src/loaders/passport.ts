import passport from 'passport'
import LocalStrategy from '@/strategies/passport/local'
import JwtStrategy from '@/strategies/passport/jwt'
import { Model } from '@/types/model'

export const passportLoader = () => {
  passport.use(LocalStrategy)
  passport.use(JwtStrategy)

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser<Model.User>((user, done) => done(null, user))

  console.info('passport loaded')
}