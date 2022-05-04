import httpMock from 'node-mocks-http'
import { faker } from '@faker-js/faker'

import { postSignUpLocal, postSignInLocal } from './auth'
import { User } from '@/models/user'
import { ErrorExistUserEmail } from '@/errors'

describe('postSignUpLocal', () => {
  let body = {
    email: faker.internet.email,
    password: faker.internet.password,
    nickname: faker.internet.userName,
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('throw error when email duplicated', async () => {
    let req = httpMock.createRequest({body})
    let res = httpMock.createResponse()

    let findByEmailMock = jest.spyOn(User, 'findByEmail')
    findByEmailMock.mockResolvedValue(new User())
        
    await expect(postSignUpLocal(req, res)).rejects.toThrowError(ErrorExistUserEmail)

    expect(findByEmailMock).toBeCalledWith(body.email)
  })

  test('success when email not duplicated', async () => {
    let req = httpMock.createRequest({body})
    let res = httpMock.createResponse()

    let findByEmailMock = jest.spyOn(User, 'findByEmail')
    findByEmailMock.mockResolvedValue(null)

    let user = new User(body)
    let saveMock = jest.spyOn(User.prototype, 'save')
    saveMock.mockResolvedValue(user)

    await postSignUpLocal(req, res)

    expect(findByEmailMock).toBeCalledWith(body.email)
    expect(saveMock).toBeCalledTimes(1)
    expect(res._getData()).toBe(JSON.stringify(user))
  })
})


describe('postSignInLocal', () => {
  test('success when email not duplicated', async () => {
    let user = new User({
      email: faker.internet.email,
      nickname: faker.internet.userName,
    })

    let req = httpMock.createRequest({user})
    let res = httpMock.createResponse()
        
    await postSignInLocal(req, res)

    expect(res._getData()).toBe(JSON.stringify(user))
  })
})
