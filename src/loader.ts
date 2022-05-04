import express from 'express'
import session from 'express-session'
import passport from 'passport'
import cors from 'cors'

import routes from '@/routes'
import { errorHandler } from '@/middlewares'
import { morganLogger } from '@/libs'
import { snakecaseResponse } from '@/libs/interceptor'
import { loadPassport } from '@/libs/passport'
import { awsLoader } from '@/libs/aws'
import { loadMongoose } from '@/models'
import { env } from '@/env'

export async function load(app:express.Express) {
    loadPassport()
    awsLoader()
    await loadMongoose()
    loadExpress(app)
}

function loadExpress(app:express.Express) {
    // Header: cors
    const corsOptions = { origin: env.allowedOrigins }
    app.use(cors(corsOptions))

    // Body: json
    app.use(express.json())

    // Authentication
    app.use(
        session({
            secret: env.sessionKey,
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
}
