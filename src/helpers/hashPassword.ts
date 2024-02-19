import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string | void> => {
  return await bcrypt.hash(password, 15)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean | void> => {
  return await bcrypt.compare(password, hash)
}
