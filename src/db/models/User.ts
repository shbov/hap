import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

interface UserAttributes {
  id: number
  name: string
  email: string
  phone: string
  password: string
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model {
  public id!: number
  public name!: string
  public email!: string
  public phone!: string
  public password!: string
  public image!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'users',
    timestamps: true,
    paranoid: true
  }
)

export default User
