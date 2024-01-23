import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
import express from 'express'
import router from './routes/index.js'
import sequelize from './db/index.js'
import models from './db/models.js'

const PORT = process.env.PORT

const app = express()
app.use('/api', router)

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