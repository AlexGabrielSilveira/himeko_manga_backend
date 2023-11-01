import "reflect-metadata"
import 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'
import router from './controllers/auth'

//routes
app.use(cors())
app.use(express.json())
app.use("/auth", router)


app.listen(8080, () => {
    console.log('himeko ta on e roteando papai!')
})