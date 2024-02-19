import User, { UserInput, UserOutput } from '../models/User'

export const create = async (payload: UserInput): Promise<UserOutput> => {
  return await User.create(payload)
}

export const getById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id)
}

export const getByIdWithoutCredentials = async (id: number): Promise<User | null> => {
  return await User.findOne({
    where: { id: id },
    attributes: {
      exclude: ['password']
    }
  })
}

export const getByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } })
}

export const getByPhone = async (phone: string): Promise<User | null> => {
  return await User.findOne({ where: { phone } })
}
