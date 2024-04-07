import Event, { EventInput, EventOutput } from '../models/Event'

export const createEvent = async (id: number, name: string, description: string, image?: string) => {
  return await Event.create({ owner_id: id, name, description, image })
}

export const create = async (payload: EventInput): Promise<EventOutput> => {
  return await Event.create(payload)
}

export const getById = async (id: number): Promise<Event | null> => {
  return await Event.findByPk(id)
}
