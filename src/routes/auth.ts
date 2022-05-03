import { Router } from 'express'
import asyncify from 'express-asyncify'

import { validation } from '@/middlewares'
import { auth } from '@/libs/passport'
import { postSignUpLocal, postSignInLocal } from '@/controllers/auth'

const router = asyncify(Router())
/**
 * @api {post} /signup/local Request Sign Up
 * @apiName sign up
 * @apiGroup Auth
 *
 * @apiBody {String} email Mandatory email of user
 * @apiBody {String} password Mandatory password of user
 * @apiBody {String} nickname Mandatory nickname of user
 *
 * @apiSuccess {String}     email       Email of the User.
 * @apiSuccess {String}     nickname    Nickname of the User.
 * @apiSuccess {Number}     type        Type of the User
 * @apiSuccess {String}     id          ID of the User
 * @apiSuccess {Number}     v           v of the User
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "email": "test@email.com",
 *         "nickname": "nick",
 *         "type": 1,
 *         "id": "62713f032b6f5029441ed74f",
 *         "v": 0
 *     }
 *
 * @apiError BadRequest Bad Request.
 *
 *  @apiErrorExample Bad Request:
 *      HTTP/1.1 404 Bad Request
 * {
 *     "code": 4000,
 *     "message": "bad request",
 *     "errors": [
 *         {
 *             "msg": "Invalid value",
 *             "param": "email",
 *             "location": "body"
 *         },
 *         {
 *             "msg": "Invalid value",
 *             "param": "password",
 *             "location": "body"
 *         },
 *         {
 *             "msg": "Invalid value",
 *             "param": "nickname",
 *             "location": "body"
 *         }
 *     ]
 * }
 *
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost:3005/api/auth/signup/local
 * @apiSampleRequest http://localhost:3005/api/auth/signup/local
 * */
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

