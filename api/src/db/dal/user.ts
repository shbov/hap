import Event from '../models/Event'
import User, { UserInput, UserOutput } from '../models/User'

export async function addFriend(user: User, friend_id: number) {
  return await user.addFriend(friend_id)
}

export const create = async (payload: UserInput): Promise<UserOutput> => {
  return await User.create(payload)
}

export const getById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id)
}

export const getUserEvents = async (id: number): Promise<Event[] | null> => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.getEvents()
}

export const getByIdWithoutCredentials = async (id: number) => {
  return await User.findOne({
    where: { id: id },
    attributes: {
      exclude: ['password']
    }
  })
}

export const getByPhone = async (phone: string) => {
  return await User.findOne({ where: { phone } })
}

export const getUserFriends = async (id: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.getFriends()
}

export const getNotifications = async (id: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.getNotifications()
}

export const getFriendRequests = async (id: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.getFriendRequests()
}

export const getFriendRequestsSent = async (id: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.getFriendRequestsSent()
}

export const acceptFriendRequest = async (id: number, friendId: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.addFriend(friendId)
}

export const declineFriendRequest = async (id: number, friendId: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.removeFriend(friendId)
}

export const sendFriendRequest = async (id: number, friendId: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.addFriendRequest(friendId)
}

export const removeFriend = async (id: number, friendId: number) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  return await user.removeFriend(friendId)
}

export const getUserByRefreshToken = async (token: string) => {
  return await User.findOne({ where: { refresh_token: token } })
}
