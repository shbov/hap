import { IntervalRequest } from '../../types/IntervalRequest'
import Interval from '../models/Interval'

export const create = async (payload: IntervalRequest) => {
  return await Interval.create({
    started_at: new Date(payload.start),
    finished_at: new Date(payload.end)
  })
}

export const getById = async (id: number): Promise<Interval | null> => {
  return await Interval.findByPk(id)
}

export const update = async (
  id: number,
  payload: IntervalRequest
): Promise<Interval | null> => {
  const interval = await getById(id)
  if (!interval) {
    return null
  }

  return await interval.update({
    started_at: new Date(payload.start),
    finished_at: new Date(payload.end)
  })
}

export const remove = async (id: number): Promise<void> => {
  const interval = await getById(id)
  if (!interval) {
    return
  }

  await interval.destroy()
}
