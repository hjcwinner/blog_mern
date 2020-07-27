const express = require('express')
const router = express.Router()

const userModel = require('../model/user')



// register
// @route  POST http://localhost:9090/user/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
    // email유무체크 => password암호화 => 회원가입
    userModel
        .findOne({email : req.body.email})
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
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password
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
})





// login
// @route   POST http://localhost:9090/user/login
// @desc    login user / return jwt
// @access  Public
router.post('/login', (req, res) => {
    // email유무 체크 => password복호화 => login(jwt반환)
    userModel
        .findOne({email : req.body.email})
        .then(user => {
            if(!user)
            {
                return res.json({
                    message : "no email"
                })
            }
            else
            {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if(err || isMatch === false)
                    {
                        return res.json({
                            message : "password incorrect"
                        })
                
                    }
                    else
                    {
                        res.json({
                            successful : isMatch
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

})




// current user
// @route   GET http://localhost:9090/user/current
// @desc    get current user from jwt
// @access  Private
router.get('/current', (req, res) => {

})


module.exports = router