import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

import Config from '../types/Config'

dotenv.config()

const config: Config = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT!, 10) ?? 5432,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  db: process.env.DB_NAME as string
}

const sequelizeConnection = new Sequelize(config.db, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'postgres'
})

export default sequelizeConnection
