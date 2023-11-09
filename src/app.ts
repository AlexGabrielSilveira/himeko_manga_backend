import "reflect-metadata"
import 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'
import router from "./routes"

//routes
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(router)


app.listen(8080, () => {
    console.log('himeko ta on e roteando papai!')
})