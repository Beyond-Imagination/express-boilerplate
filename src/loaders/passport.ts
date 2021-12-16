import passport from 'passport'
import { LocalStrategy } from '@/libs/passport/strategies'
import { Model } from '@/types/model'

export const passportLoader = () => {
  passport.use(LocalStrategy)

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser<Model.User>((user, done) => done(null, user))

  console.info('passport loaded')
}