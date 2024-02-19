export type SignInOutput = {
  id: number
  name: string
  email: string
  accessToken: string
}

export type SignInInput = {
  password: string
  phone: string
}
