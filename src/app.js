require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./controllers/auth')

//routes
app.use(express.json())
app.use("/auth", router)




app.listen(8080)