import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'
import Event from './Event'
import User from './User'

interface EventInviteAttributes {
  id: number
  event_id: number
  user_id: number
  status: string
}

export interface EventInviteInput extends Optional<EventInviteAttributes, 'id'> {}

export interface EventInviteOutput extends Required<EventInviteAttributes> {}

class EventInvite extends Model {
  public id!: number
  public event_id!: number
  public user_id!: number
  public status!: string
}

EventInvite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'declined'),
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'eventInvites'
  }
)

EventInvite.belongsTo(Event, { foreignKey: 'event_id', as: 'event' })
EventInvite.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

export default EventInvite
