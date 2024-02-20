import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import User from './User'
import { v4 as uuidv4 } from 'uuid'

const jwtDataOptions = {
  secret: process.env.JWT_SECRET || '',
  jwtExpiration: process.env.JWT_EXPIRATION || '',
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || ''
}

interface AuthTokenAttributes {
  id: number
  user: number
  token: string
  expiryDate: Date
}

export interface AuthTokenInput extends Optional<AuthTokenAttributes, 'id'> {}
export interface AuthTokenOutput extends Required<AuthTokenAttributes> {}

class AuthToken extends Model {
  public id!: number
  public user!: number
  public token!: string
  public expiryDate!: Date

  public static async createToken(user: User) {
    const expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + parseInt(jwtDataOptions.jwtRefreshExpiration, 10))
    const _token = uuidv4()

    const refreshToken = await AuthToken.create({
      token: _token,
      user: user.id,
      expiryDate: expiredAt.getTime()
    })

    return refreshToken.token
  }

  public static verifyExpiration(token: AuthToken) {
    return token.expiryDate.getTime() < new Date().getTime()
  }
}

AuthToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'authTokens',
    timestamps: true
  }
)

AuthToken.belongsTo(User, { foreignKey: 'user', as: 'user_id' })

export default AuthToken
