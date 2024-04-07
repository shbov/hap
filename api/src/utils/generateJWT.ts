import jwt from 'jsonwebtoken'

const dev = process.env.NODE_ENV === 'development'

export const generateJWT = (userId: number, secret: string, time: string) => {
  return jwt.sign(
    {
      userId
    },
    secret,
    { expiresIn: time }
  )
}
