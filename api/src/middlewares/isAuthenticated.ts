import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'

import * as refreshTokenDal from '../db/dal/refreshToken'
import * as userDal from '../db/dal/user'

const { ACCESS_TOKEN_SECRET } = process.env

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken = req.get('Authorization')
    const accessToken = authToken?.split('Bearer ')[1]
    if (!accessToken) {
      throw createError.Unauthorized()
    }

    const { signedCookies = {} } = req
    const { refreshToken } = signedCookies
    if (!refreshToken) {
      throw createError.Unauthorized()
    }

    const refreshTokenInDB = await refreshTokenDal.getRefreshToken(refreshToken)
    if (!refreshTokenInDB) {
      throw createError.Unauthorized()
    }

    let decodedToken
    try {
      decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET!) as {
        userId: number
      }
    } catch (err) {
      return next(createError.Unauthorized())
    }

    const { userId } = decodedToken

    const user = await userDal.getById(userId)
    if (!user) {
      throw createError.Unauthorized()
    }

    req.userId = user.id
    return next()
  } catch (error) {
    return next(error)
  }
}
