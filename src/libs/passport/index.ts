import passport from 'passport'

import local from './local'

export function loadPassport() {
  passport.use(local.strategy)

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))
}

export const auth = {
  "local": local.auth,
}
