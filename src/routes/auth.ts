import { Router } from 'express'
import asyncify from 'express-asyncify'

import { validation } from '@/middlewares'
import { auth } from '@/libs/passport'
import { postSignUpLocal, postSignInLocal } from '@/controllers/auth'

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
  postSignUpLocal,
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
  postSignInLocal,
)

export default {
  name: 'auth',
  router
}
