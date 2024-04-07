import RefreshToken from '../models/RefreshToken'

export async function createRefreshToken({
  token,
  user_id,
  expires_at
}: {
  token: string
  user_id: number
  expires_at: number
}) {
  return RefreshToken.create({
    token,
    user_id,
    expires_at: new Date(expires_at)
  })
}

export const deleteRefreshToken = async (id: number) => {
  return RefreshToken.destroy({ where: { id } })
}

export const getRefreshToken = async (token: string) => {
  return RefreshToken.findOne({ where: { token: token } })
}
