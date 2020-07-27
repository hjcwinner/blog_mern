const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

////database
const database = "mongodb+srv://blog:hjc8056107@cluster0.smqqa.mongodb.net/blog?retryWrites=true&w=majority"

mongoose
    .connect(database, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log('mongdb connected...'))
    .catch(err => console.log(err.message))


////middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


////routing


const port = 9090
app.listen(port, console.log(`server started at ${port}`))
