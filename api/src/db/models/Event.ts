import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'
import EventInvite from './EventInvite'
import Interval from './Interval'
import User from './User'

interface EventAttributes {
  id: number
  name: string
  description: string | null
  owner_id: number
  image: string | null
  chosen_interval: number | null
}

export interface EventInput
  extends Optional<
    EventAttributes,
    'id' | 'image' | 'chosen_interval' | 'description'
  > {}

export interface EventOutput extends Required<EventAttributes> {}

class Event extends Model {
  public id!: number
  public name!: string
  public description!: string | null
  public owner_id!: number
  public image!: string | null
  public chosen_interval!: number | null

  public readonly created_at!: Date
  public readonly updated_at!: Date
  public readonly deleted_at!: Date

  async getInvites() {
    return await EventInvite.findAll({ where: { event_id: this.id } })
  }

  async getOwner() {
    return await User.findByPk(this.owner_id)
  }

  async getInterval() {
    if (!this.chosen_interval) {
      return null
    }

    return await Interval.findByPk(this.chosen_interval)
  }

  async attachChosenInterval(interval: Interval) {
    await this.update({ chosen_interval: interval.id })
  }

  async attachInterval(interval: Interval) {
    await interval.update({ event_id: this.id })
  }

  async getParticipants() {
    return await User.findAll({
      include: {
        model: Event,
        where: { id: this.id }
      }
    })
  }
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

Event.hasMany(EventInvite, { foreignKey: 'event_id' })
Event.hasOne(Interval, { foreignKey: 'id' })

Interval.belongsTo(Event, { foreignKey: 'id' })

export default Event
