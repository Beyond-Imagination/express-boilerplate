import { Router } from 'express'
import asyncify from 'express-asyncify'
import { body, validationResult } from 'express-validator'
import passport from 'passport'

import { User, AuthType } from '@/models/user'
import { success } from '@/helpers/response'
import { AlreadyUsingUserIdError, NoUserError } from '@/errors/auth'
import { ReqParamsNotMatchError } from '@/errors/req'

const router = asyncify(Router())

router.post('/signup/local', 
  [
    body('email').exists(),
    body('password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ReqParamsNotMatchError(errors)
    }

    const { email, password, nickname } = req.body

    let existUser = await User.findByEmail(email);
    if (existUser) {
      throw new AlreadyUsingUserIdError(email)
    }

    let user = {
      email: email,
      password: password,
      nickname: nickname,
      type: AuthType.Local,
    }
    user = await new User(user).save()

    success(res, user)
  }
)

router.post('/signin/local', 
  passport.authenticate('local'),
  async (req, res) => {
    success(res, req.user)
  }
)

export default {
  name: 'auth',
  router
}
