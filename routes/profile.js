const express = require('express')
const router = express.Router()
const passport = require('passport')


const profileModel = require('../model/profile')


const checkAuth = passport.authenticate('jwt', { session: false })




// @route  POST http://localhost:9090/profile
// @desc   Register profile from user
// @access Private
router.post('/', checkAuth, (req, res) => {
        
})


module.exports = router
