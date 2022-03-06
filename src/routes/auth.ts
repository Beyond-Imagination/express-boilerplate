import { Router } from 'express'
import asyncify from 'express-asyncify'

import { validation } from '@/middlewares'
import { User, AuthType } from '@/models/user'
import { ErrorExistUserEmail } from '@/errors'
import { auth } from '@/libs/passport'

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
      throw new ErrorExistUserEmail()
    }

    let user = {
      email: email,
      password: password,
      nickname: nickname,
      type: AuthType.Local,
    }
    user = await new User(user).save()

    res.json(user)
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
  auth.local,
  async (req, res) => {
    res.json(req.user)
  }
)

export default {
  name: 'auth',
  router
}
