import { Response } from 'express'

export const errorHelper = (err: unknown, trace: string, code: number, res: Response): Response => {
  if (err instanceof Error) {
    console.error(`[${trace}] ${err.message}`)
    return res.status(code).send({ message: err.message })
  }

  console.error(`[${trace}] ${err}`)
  return res.status(code).send({ message: err })
}
