import Event, { EventInput, EventOutput } from '../models/Event'
import EventInvite from '../models/EventInvite'

export const createEvent = async (id: number, name: string, description: string, image?: string) => {
  return await Event.create({ owner_id: id, name, description, image })
}

export const create = async (payload: EventInput): Promise<EventOutput> => {
  return await Event.create(payload)
}

export const getById = async (id: number): Promise<Event | null> => {
  return await Event.findByPk(id)
}

export const sendInvite = async (eventId: number, userId: number) => {
  return await EventInvite.create({ user_id: userId, event_id: eventId })
}

export const getUserEvents = async (userId: number) => {
  return await Event.findAll({ where: { owner_id: userId } })
}

export const getEvent = async (eventId: number) => {
  return await Event.findByPk(eventId)
}

export const getInvites = async (eventId: number) => {
  return await EventInvite.findAll({ where: { event_id: eventId } })
}

export const attachChosenInterval = async (event: Event, intervalId: number) => {
  await event.update({ chosen_interval: intervalId })
}

export const deleteEvent = async (eventId: number) => {
  return await Event.destroy({ where: { id: eventId } })
}

export const deleteInvite = async (inviteId: number) => {
  return await EventInvite.destroy({ where: { id: inviteId } })
}

export const deleteInvites = async (eventId: number) => {
  return await EventInvite.destroy({ where: { event_id: eventId } })
}

export const getEventByInvite = async (inviteId: number) => {
  const invite = await EventInvite.findByPk(inviteId)
  if (!invite) {
    return null
  }

  return await Event.findByPk(invite.event_id)
}

export const getEventByInterval = async (intervalId: number) => {
  return await Event.findOne({ where: { chosen_interval: intervalId } })
}

export const getEventByInviteToken = async (token: string) => {
  const invite = await EventInvite.findOne({ where: { token } })
  if (!invite) {
    return null
  }

  return await Event.findByPk(invite.event_id)
}

export const getEventByIntervalId = async (intervalId: number) => {
  return await Event.findOne({ where: { chosen_interval: intervalId } })
}
