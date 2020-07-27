const mongoose = require('mongoose')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
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

userSchema.pre("save", async function (next) {
    try {
        console.log('entered')
        const avatar = await gravatar.url(this.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        this.avatar = avatar

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        console.log('exited')
        next()
    }
    catch(error) {
        next(error)
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) 
        {
            return cb(err)

        }
        else
        {
            cb(null, isMatch)
        }
    })
}



module.exports = mongoose.model('user', userSchema)