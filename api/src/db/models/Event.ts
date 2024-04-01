import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'
import EventInvite from './EventInvite'
import Interval from './Interval'
import User from './User'

interface EventAttributes {
  id: number
  name: string
  description: string
  owner_id: number
  image: string | null
  chosen_interval: string
}

export interface EventInput extends Optional<EventAttributes, 'id' | 'image' | 'chosen_interval' | 'description'> {}

export interface EventOutput extends Required<EventAttributes> {}

class Event extends Model {
  public id!: number
  public name!: string
  public description!: string | null
  public owner_id!: number
  public image!: string | null
  public chosen_interval!: number | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    chosen_interval: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: Interval,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'events',
    paranoid: true
  }
)

Event.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' })
Event.belongsTo(Interval, { foreignKey: 'chosen_interval', as: 'interval' })

Event.hasMany(EventInvite, { foreignKey: 'event_id', as: 'invites' })

export default Event
