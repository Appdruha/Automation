import dotenv from 'dotenv'
import express from 'express'
import router from './routers/index.ts'
import sequelize from './db/index.ts'
import cookieParser from 'cookie-parser'
import apiErrorHandler from './middlewares/error-handler-middleware.ts'

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })
const PORT = process.env.PORT

export const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(apiErrorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
