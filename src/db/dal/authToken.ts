import AuthToken from '../models/AuthToken'

export const getByToken = async (requestToken: string) => {
  return await AuthToken.findOne({ where: { token: requestToken } })
}
