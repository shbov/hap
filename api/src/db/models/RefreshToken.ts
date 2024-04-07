import { DataTypes, Model } from 'sequelize'

import sequelizeConnection from '../config'

class RefreshToken extends Model {
  public id!: number
  public token!: string
  public user_id!: number
  public expires_at!: Date
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'refresh_tokens',
    timestamps: true
  }
)

export default RefreshToken
