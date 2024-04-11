import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'
import User from './User'

class FriendRequest extends Model {
  public user_id!: number
  public friend_id!: number
  public status!: string

  public static async getFriendRequestsSent(user_id: number) {
    return await FriendRequest.findAll({
      where: {
        user_id
      }
    })
  }
}

FriendRequest.init(
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
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'friend_request',
    timestamps: false
  }
)

export default FriendRequest
