const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotEnv = require('dotenv')
dotEnv.config()


const userRoutes = require('./routes/user')


////database
require('./config/database')



////middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


////routing
app.use('/user', userRoutes)



const port = process.env.PORT
app.listen(port, console.log(`server started at ${port}`))
