import './instrument'

import * as Sentry from '@sentry/node'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'

import routes from './src/routes'
import { CustomError } from './src/types/CustomError'

dotenv.config()
const port = process.env.PORT ?? 3000
const { NODE_ENV } = process.env
const isDev = NODE_ENV === 'development'

const app: Express = express()
if (isDev) {
  app.use(
    cors({
      origin: `http://localhost:${port}`,
      optionsSuccessStatus: 200,
      credentials: true
    })
  )
}

app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/api/v1', routes)

Sentry.setupExpressErrorHandler(app)

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error('\x1b[31m', error)
    if (res.headersSent) {
      return next(error)
    }

    return res.status(error.status || 500).json({
      error: {
        status: error.status || 500,
        message: error.status ? error.message : 'Internal Server Error'
      }
    })
  }
)

app.get('*', function (req, res) {
  res.status(404)
  res.send({
    error: {
      status: 404,
      message: 'Not Found'
    }
  })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
