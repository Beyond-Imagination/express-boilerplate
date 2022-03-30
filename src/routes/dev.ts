import { Router } from 'express'
import asyncify from 'express-asyncify'

import { User, AuthType } from '@/models/user'
import { ErrorExistUserEmail } from '@/errors'

const router = asyncify(Router())

// api 호출시 임의의 이메일과 비밀번호로 회원가입
router.post('/test/signup',
  async (req, res) => {    
    // faker 쓰면 더 좋을 듯
    let email = Math.random().toString(36).slice(2)
    let password = Math.random().toString(36).slice(2)
    let nickname = Math.random().toString(36).slice(2)

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

export default {
  name: 'dev',
  router
}
