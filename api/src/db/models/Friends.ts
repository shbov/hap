import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'
import User from './User'

class Friends extends Model {
  public user_id!: number
  public friend_id!: number
}

Friends.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id'
      }
    },
    friend_id: {
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
    tableName: 'friends',
    timestamps: false
  }
)

export default Friends
