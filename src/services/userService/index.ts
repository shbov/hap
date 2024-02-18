import * as userDal from '../../db/dal/user'
import { UserInput, UserOutput } from '../../db/models/User'

export const create = (payload: UserInput): Promise<UserOutput> => {
  return userDal.create(payload)
}

export const getById = (id: number): Promise<UserOutput> => {
  return userDal.getById(id)
}
