import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'
import Event from './Event'
import EventUser from './EventUser'
import Interval from './Interval'

interface UserAttributes {
  id: number
  name: string
  phone: string
  password: string
  image: string | null
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'image'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model {
  public id!: number
  public name!: string
  public phone!: string
  public password!: string
  public image!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date

  async getEvents() {
    return await Event.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'id', 'image']
        },
        {
          model: Interval,
          attributes: ['id', 'started_at', 'finished_at']
        }
      ]
    })
  }

  async getFriends(): Promise<User[] | null> {
    const user = await User.findByPk(this.id, {
      include: [
        {
          model: User,
          as: 'friends',
          attributes: ['name', 'id', 'image']
        }
      ]
    })

    // @ts-ignore
    return user.friends
  }
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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

User.belongsToMany(Event, { through: EventUser, foreignKey: 'user_id' })
Event.belongsToMany(User, { through: EventUser, foreignKey: 'event_id' })

User.hasMany(Event, { foreignKey: 'owner_id' })
Event.belongsTo(User, { foreignKey: 'owner_id' })

User.belongsToMany(User, {
  through: 'user_friends',
  as: 'friends',
  foreignKey: 'user_id',
  otherKey: 'friend_id'
})

export default User
