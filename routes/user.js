const express = require('express')
const router = express.Router()
const passport = require('passport')

const { userRegister, userlogin, user_current, user_get_all, user_get_detail, accountActivation } = require('../controllers/user')

const checkAuth = passport.authenticate('jwt', { session: false })


const {
    validSignup,
    validSignin
} = require('../helper/validation')



// register
// @route  POST http://localhost:9090/user/register
// @desc   Register user / send email
// @access Public
router.post('/register', validSignup, userRegister)

// activation account
// @route  POST http://localhost:9090/user/activation
// @desc   Activation account / confirm email
// @access private
router.post('/activation', accountActivation)



// login
// @route   POST http://localhost:9090/user/login
// @desc    login user / return jwt
// @access  Public
router.post('/login', validSignin, userlogin)


// current user
// @route   GET http://localhost:9090/user/current
// @desc    get current user from jwt
// @access  Private
router.get('/current', checkAuth, user_current)


// get      All user
// @route   GET http://localhost:9090/user
// @desc    get user all
// @access  public
router.get('/', user_get_all)


// get      Detail user
// @route   GET http://localhost:9090/user:userid
// @desc    GET user detail
// @access  public
router.get('/:userid', user_get_detail)


module.exports = router