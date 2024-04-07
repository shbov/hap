import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'
import Event from './Event'
import User from './User'

class EventUser extends Model {
  public event_id!: number
  public user_id!: number
}

EventUser.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Event,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'event_user',
    timestamps: false
  }
)

export default EventUser
