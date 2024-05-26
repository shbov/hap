import { Request, Response } from 'express'

import * as refreshTokenDal from '../db/dal/refreshToken'

const dev = process.env.NODE_ENV === 'development'

export const clearTokens = async (req: Request, res: Response) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if (refreshToken) {
    const token = await refreshTokenDal.getRefreshToken(refreshToken)
    if (token) {
      await refreshTokenDal.deleteRefreshToken(token.id)
    }
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: !dev,
    signed: true
  })
}
