const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        avatar : {
            type : String
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('user', userModel)