import passport from 'passport'
import { Strategy } from "passport-local"

import { User } from '@/models/user'
import { ErrorNotExistUserEmail, ErrorInvalidPassword } from '@/errors'

const strategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }, 
  async (email, password, done) => {
    try {
      let user = await User.findByEmail(email);
      if (!user) {
        return done(new ErrorNotExistUserEmail(), false)
      } else if (!user.checkPassword(password)) {
        return done(new ErrorInvalidPassword(), false)
      } else {
        return done(null, user)
      }
    } catch (e) {
      return done(e, false)
    }
  }
)

const auth = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      next(err)
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
} 

export default {
  strategy,
  auth,
}
