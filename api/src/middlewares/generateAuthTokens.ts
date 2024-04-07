import { NextFunction, Request, Response } from 'express'
import ms from 'ms'

import * as refreshTokenDal from '../db/dal/refreshToken'
import * as userDal from '../db/dal/user'
import { generateJWT } from '../utils/generateJWT'

const { ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

export const generateAuthTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.sendStatus(204)
    }

    const user = await userDal.getById(req.userId)
    if (!user) {
      return res.sendStatus(204)
    }

    const refreshToken = generateJWT(req.userId, REFRESH_TOKEN_SECRET!, REFRESH_TOKEN_LIFE!)
    const accessToken = generateJWT(req.userId, ACCESS_TOKEN_SECRET!, ACCESS_TOKEN_LIFE!)

    const refreshTokenInDB = await refreshTokenDal.createRefreshToken({
      token: refreshToken,
      user_id: req.userId,
      expires_at: new Date(Date.now() + ms(REFRESH_TOKEN_LIFE!)).getTime()
    })

    res.cookie('refreshToken', refreshTokenInDB.token, {
      httpOnly: true,
      secure: !dev,
      signed: true,
      expires: new Date(Date.now() + ms(REFRESH_TOKEN_LIFE!))
    })

    const expiresAt = new Date(Date.now() + ms(ACCESS_TOKEN_LIFE!))
    return res.status(200).json({
      user,
      token: accessToken,
      expiresAt
    })
  } catch (error) {
    return next(error)
  }
}
