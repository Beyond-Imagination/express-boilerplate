import { User, AuthType } from '@/models/user'
import { ErrorExistUserEmail } from '@/errors'

export const postSignUpLocal = async (req, res) => {
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

export const postSignInLocal = async (req, res) => {
    res.json(req.user)
}
