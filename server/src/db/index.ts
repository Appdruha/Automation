import dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import User from "./models/user.ts";
import Worker from "./models/worker.ts";
import Session from "./models/session.ts";

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  models: [User, Worker, Session],
})

export default sequelize
