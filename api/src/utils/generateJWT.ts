import jwt from 'jsonwebtoken'

export const generateJWT = (userId: number, secret: string, time: string) => {
  return jwt.sign(
    {
      userId
    },
    secret,
    { expiresIn: time }
  )
}
