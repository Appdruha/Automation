import express from "express"
import router from "./routes";
import dotenv from "dotenv"
import sequelize from "./db/index"
import models from "./db/models"
const PORT= process.env.PORT

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

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