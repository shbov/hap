import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'

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

export default EventInvite
