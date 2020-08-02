const express = require('express')
const router = express.Router()
const passport = require('passport')



const userModel = require('../model/user')
const { userRegister, userlogin } = require('../controllers/user')

const checkAuth = passport.authenticate('jwt', { session: false })


// register
// @route  POST http://localhost:9090/user/register
// @desc   Register user
// @access Public
router.post('/register', userRegister)


// login
// @route   POST http://localhost:9090/user/login
// @desc    login user / return jwt
// @access  Public
router.post('/login', userlogin)




// current user
// @route   GET http://localhost:9090/user/current
// @desc    get current user from jwt
// @access  Private
router.get('/current', checkAuth, (req, res) => {

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
    


})


// 전체유저불러오기

// detail유저불러오기





module.exports = router