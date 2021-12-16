import passport from 'passport'
import { LocalStrategy } from '@/libs/passport/strategies'

export const passportLoader = () => {
  passport.use(LocalStrategy)

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  console.info('passport loaded')
}
