import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
import { Sequelize } from 'sequelize-typescript'

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
})

export default sequelize