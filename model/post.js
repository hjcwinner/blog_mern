const mongoose = require('mongoose')
const postSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user',
            required : true
        },
        text : {
            type : String,
            required : true
        },
        name : {
            type : String
        },
        avatar : {
            type : String
        },
        likes : [
            {
                user : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'user',
                    required : true
                }
            }
        ],
        comments : [
            {
                user : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'user',
                    required : true
                },
                text : {
                    type : String,
                    required : true
                },
                name : {
                    type : String
                },
                avatar : {
                    type : String
                },
            }
        ]
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model('post', postSchema)