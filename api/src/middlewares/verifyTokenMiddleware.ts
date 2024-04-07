import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const jwtDataOptions = {
  secret: process.env.JWT_SECRET || '',
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION
}

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  let token = req.headers['authorization']
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' })
  }

  console.log(`[verifyTokenMiddleware] token: ${token}`)
  if (token.startsWith('Bearer ')) {
    token = token.substring(7, token.length)
  } else {
    return res.status(403).send({ message: 'Token is invalid!' })
  }

  try {
    console.log(`[verifyTokenMiddleware] token: ${token}, secret: ${jwtDataOptions.secret}`)

    const r = jwt.verify(token, jwtDataOptions.secret) as { id: number }
    req.user = {
      id: Number(r.id)
    }

    next()
  } catch (err) {
    console.log(`[verifyTokenMiddleware] ${err}`)

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ message: 'Unauthorized! Access Token expired!' })
    }

    return res.status(401).send({ message: 'Unauthorized!' })
  }
}
