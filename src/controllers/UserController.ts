import * as userDal from '../db/dal/user'
import User, { UserInput, UserOutput } from '../db/models/User'
import { hashPassword } from '../helpers/hashPassword'

export class UserController {
  public static async create(payload: UserInput): Promise<UserOutput> {
    const userPayload = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      password: await hashPassword(payload.password)
    } as UserInput

    const emailExists = await userDal.getByEmail(userPayload.email)
    if (emailExists) {
      throw new Error('email already in use')
    }

    const phoneExists = await userDal.getByPhone(userPayload.phone)
    if (phoneExists) {
      throw new Error('phone already is use')
    }

    return userDal.create(userPayload)
  }

  public static async getById(id: number): Promise<User | null> {
    const user = await userDal.getById(id)
    if (!user) {
      throw new Error('user not found')
    }

    return user
  }

  public static getByEmail(email: string): Promise<User | null> {
    return userDal.getByEmail(email)
  }

  public static getByPhone(phone: string): Promise<User | null> {
    return userDal.getByPhone(phone)
  }
}
