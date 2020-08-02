const express = require('express')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const passport = require('passport')
const dotEnv = require('dotenv')
dotEnv.config()


const app = express()




const userRoutes = require('./routes/user')
const profileRoutes = require('./routes/profile')

////database
require('./config/database')



////middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

require('./config/passport')(passport)


////routing
app.use('/user', userRoutes)
app.use('/profile', profileRoutes)


const port = process.env.PORT
app.listen(port, console.log(`server started at ${port}`))
