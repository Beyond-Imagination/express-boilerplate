import { Router } from 'express'
import asyncify from 'express-asyncify'
import passport from 'passport'

import { validation } from '@/middlewares'
import { User, AuthType } from '@/models/user'
import { success } from '@/helpers/response'
import { AlreadyUsingUserIdError, NoUserError } from '@/errors/auth'

const router = asyncify(Router())

router.post('/signup/local', 
  validation({
    email: {
      isEmail: true,
    },
    password: {
      isString: true,
    },
    nickname: {
      isString: true,
    }
  }),
  async (req, res) => {
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
  validation({
    email: { 
      isEmail: true,
    },
    password: { 
      isString: true,
    },
  }),
  passport.authenticate('local'),
  async (req, res) => {
    success(res, req.user)
  }
)

export default {
  name: 'auth',
  router
}
