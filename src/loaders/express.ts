import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'

import routes from '@/routes'

import {errorHandler} from '@/middlewares'
import {morganLogger} from '@/libs'
import {env} from '@/env'
import {snakecaseResponse} from '@/libs/interceptor'

const { sessionKey } = env

export const expressLoader = () => {
  const app = express()

  // Header: cors
  app.use(cors())

  // Body: json
  app.use(express.json())

  // Authentication
  app.use(
    session({
      secret: sessionKey,
      resave: false,
      saveUninitialized: false,
    })
  )

  // Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // Morgan
  app.use(morganLogger())

  app.use(snakecaseResponse)

  // Routes
  routes.forEach((route) => app.use(`/api/${route.name}`, route.router))

  // Error Handling
  app.use(errorHandler)

  console.info('express loaded')

  return app
}
