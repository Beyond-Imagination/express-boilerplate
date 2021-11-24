import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import passport from 'passport'

import routes from '@/routes'
import {errorHandler} from '@/middlewares'
import {env} from '@/env'

const {sessionKey} = env

export const expressLoader = () => {
  const app = express()

  app.use(express.json())
  app.use(morgan('dev'))
  app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false
  }))

  //  Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // add routes
  routes.forEach((route) => app.use(`/api/${route.name}`, route.router))

  app.use(errorHandler)

  console.info('express loaded')

  return app
}
