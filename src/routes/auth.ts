import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import passport from 'passport'

import wrapAsync from '@/middlewares/async'
import { User, AuthType } from '@/models/user'
import { success } from '@/helpers/response'
import { AlreadyUsingUserIdError, NoUserError } from '@/errors/auth'
import { ReqParamsNotMatchError } from '@/errors/req'
import { generatePassword } from '@/helpers/password'
import { reverseProjection } from '@/helpers/object'

const router = Router()

router.post('/signup/local', [
  body('email').exists(),
  body('password').exists(),
], wrapAsync(
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ReqParamsNotMatchError(errors)
    }

    const { email, password, nickname } = req.body
    const hashedPassword = generatePassword(password)

    let existUser = await User.findOne({email: email}).exec();
    if (existUser) {
      throw new AlreadyUsingUserIdError(email)
    }

    let user = {
      email: email,
      password: hashedPassword,
      nickname: nickname,
      type: AuthType.Local,
    }
    await new User(user).save()

    success(res, reverseProjection(user, ['password']))
  }
))

router.post('/signin/local', 
  passport.authenticate('local'),
  wrapAsync(
    async (req, res) => {
      success(res, reverseProjection(req.user, ['password']))
    }
))

export default {
  name: 'auth',
  router
}
