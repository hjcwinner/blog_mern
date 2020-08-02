const express = require('express')
const router = express.Router()
const passport = require('passport')


const profileModel = require('../model/profile')


const checkAuth = passport.authenticate('jwt', { session: false })




// @route  POST http://localhost:9090/profile
// @desc   Register profile from user
// @access Private
router.post('/', checkAuth, (req, res) => {

    const profileFields = {}


    profileFields.user = req.user.id
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }


    profileModel
        .findOne({user : req.user.id})
        .then(profile => {
            if(profile)
            {
                // profile정보가 있으면
                return res.status(400).json({
                    message : "profile already exists, please update profile"
                })
            }
            else
            {
                // profile정보가 없으면
                new profileModel(profileFields)
                    .save()
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err.message))

            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })

})



// @route  GET http://localhost:9090/profile
// @desc   Get profile from currents user
// @access Private
router.get('/', checkAuth, (req, res) => {
    profileModel
        .findOne({user : req.user.id})
        .populate("user",["name","email"])
        .then(profile => {
            if(!profile)
            {
                return res.status(200).json({
                    message : "no profile"
                })
            }
            else
            {
                res.status(200).json({
                    message : "successful profileInfo",
                    profileInfo : profile 
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
})




module.exports = router
