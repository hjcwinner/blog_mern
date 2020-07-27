const express = require('express')
const router = express.Router()



// register
// @route  POST http://localhost:9090/user/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {

})







// login
// @route   POST http://localhost:9090/user/login
// @desc    login user / return jwt
// @access  Public
router.post('/login', (req, res) => {

})




// current user
// @route   GET http://localhost:9090/user/current
// @desc    get current user from jwt
// @access  Private
router.get('/current', (req, res) => {

})


module.exports = router