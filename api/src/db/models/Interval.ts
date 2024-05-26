import { DataTypes, Model, Optional } from 'sequelize'

import sequelizeConnection from '../config'

interface IntervalAttributes {
  id: number
  event_id: number
  user_id: number | null
  started_at: Date
  finished_at: Date
}

export interface IntervalInput
  extends Optional<IntervalAttributes, 'id' | 'user_id'> {}

export interface IntervalOutput extends Required<IntervalAttributes> {}

class Interval extends Model {
  public id!: number
  public event_id!: number
  public user_id!: number | null
  public started_at!: Date
  public finished_at!: Date
}

Interval.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finished_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'intervals',
    timestamps: false
  }
)

export default Interval
