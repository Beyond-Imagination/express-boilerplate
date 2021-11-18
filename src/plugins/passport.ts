import passport from 'passport'
import LocalStrategy from '@/strategies/passport/local'
import JwtStrategy from '@/strategies/passport/jwt'
import { Model } from '@/types/model'

passport.use(LocalStrategy)
passport.use(JwtStrategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser<Model.User>((user, done) => done(null, user))
