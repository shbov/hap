import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'

class Notification extends Model {
  public id!: number
  public userId!: number
  public message!: string
  public read!: boolean
  public createdAt!: Date
  public updatedAt!: Date
}

Notification.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'notifications',
    timestamps: true
  }
)

export default Notification
