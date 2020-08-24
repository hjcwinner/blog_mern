const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)



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
                    const payload = { name, email, password }

                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_KEY,
                        { expiresIn : '20m'}
                    )


                    const emailData = {
                        from: process.env.EMAIL_FROM,
                        to : email,
                        subject : 'Account activation link',
                        html :`
                            <h1>Please use the following to activate your account</h1>
                            <p>http://localhost:3000/users/activate/${token}</p>
                            <hr />
                            <p>This email may containe sensetive information</p>
                            <p>http://localhost:3000</p>
                            
                        `
                    }

                    sgMail
                        .send(emailData)
                        .then(() => {
                            res.status(200).json({
                                message : `Email has been sent to ${email}`
                            })
                        })
                        .catch(err => {
                            res.status(404).json({
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

exports.accountActivation = (req, res) => {
    const { token } = req.body

    if(token)
    {
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if(err)
            {
                return res.status(401).json({
                    errors : 'Expired link, Signup again'
                })
            }
            else
            {
                const { name, email, password } = jwt.decode(token)
                const user = new userModel({
                    name, email, password
                })

                user
                    .save()
                    .then(user => {
                        res.status(200).json({
                            success : true,
                            message : 'Signup success',
                            userInfo : user
                        })
                    })
                    .catch(err => {
                        res.status(404).json({
                            message : err.message
                        })
                    })
            }
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

exports.user_current = (req, res) => {

    // res.status(200).json({
    //     id : req.user.id,
    //     email : req.user.email,
    //     name : req.user.name
    // })

    userModel
        .findById(req.user.id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
}

exports.user_get_all = (req, res) => {
    userModel
        .find()
        .then(users => {
            res.status(200).json({
                count : users.length,
                userInfo : users
            })
        })
        .catch(err => {
            res.status(400).json({
                message : err.message
            })
        })        
}

exports.user_get_detail = (req, res) => {
    userModel
        .findById(req.params.userid)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({
                message : err.message
            })
        }) 
}