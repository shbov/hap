import User, { UserInput, UserOutput } from '../models/User'

export const create = async (payload: UserInput): Promise<UserOutput> => {
  return await User.create(payload)
}

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id)
  if (!user) {
    throw new Error('not found')
  }

  return user
}
