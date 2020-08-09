

const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')






const userModel = require('../model/user')

function tokenGenerator(payload) {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn : '1d'}
    )
}

exports.userRegister = (req, res) => {
    // email유무체크 => password암호화 => 회원가입
    const {email, name, password} = req.body

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(404).json(errors)
    }
    else
    {
        userModel
            .findOne({email})
            .then(user => {
                if(user) 
                {
                    return res.json({
                        message : "email already exists"
                    })
                }
                else
                {
                    const newUser = new userModel({
                        name, email, password
                    })
                    newUser
                        .save()
                        .then(doc => {
                            res.json({
                                id : doc._id,
                                name : doc.name,
                                email : doc.email,
                                password : doc.password,
                                avatar : doc.avatar
                            })
                        })
                        .catch(err => {
                            res.json({
                                message : err.message
                            })
                        }) 
                }
            })
            .catch(err => {
                res.json({
                    message : err.message
                })
            })  
    }    
}

exports.userlogin = (req, res) => {
    // email유무 체크 => password복호화 => login(jwt반환)
    const {email, password} = req.body
    
    const errors = validationResult(req)

    if(!errors.isEmpty())
    {
        return res.status(404).json(errors)
    }
    else
    {
        userModel
        .findOne({email})
        .then(user => {
            if(!user)
            {
                return res.json({
                    message : "no email"
                })
            }
            else
            {
                user.comparePassword(password, (err, isMatch) => {
                    if(err || isMatch === false)
                    {
                        return res.json({
                            message : "password incorrect"
                        })
                
                    }
                    else
                    {
                        const payload = {id : user._id, email : user.email, name : user.name, avatar : user.avatar}
                        res.status(200).json({
                            successful : isMatch,
                            token : tokenGenerator(payload)
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                message : err.message
            })
        })
    }

    

}