const express = require('express')
const router = express.Router()
const passport = require('passport')

const { profile_post, profile_detail_get, profile_delete, profile_total, profile_experience, profile_education } = require('../controllers/profile')

const checkAuth = passport.authenticate('jwt', { session: false })

const profileModel = require('../model/profile')

const {
     validProfile,
     validExp,
     validEdu
} = require('../helper/validation')



// @route  POST http://localhost:9090/profile
// @desc   Register/Edit profile from user
// @access Private
router.post('/', validProfile, checkAuth, profile_post)


// @route  GET http://localhost:9090/profile
// @desc   Get profile from currents user
// @access Private
router.get('/', checkAuth, profile_detail_get)


// @route  Delete http://localhost:9090/profile
// @desc   Delete profile from currents user
// @access Private
router.delete('/', checkAuth, profile_delete)


// @route  Get http://localhost:9090/profile/total
// @desc   Get total profile
// @access Public
router.get('/total', profile_total)


// @route  Post http://localhost:9090/profile/experience
// @desc   Add experience to profile
// @access Private
router.post('/experience', checkAuth, validExp, profile_experience)


// @route  Post http://localhost:9090/profile/education
// @desc   Add education to profile
// @access Private
router.post('/education', checkAuth, validEdu, profile_education)


// @route  Delete http://localhost:9090/profile/experience/:exp_id
// @desc   Delete experience from profile
// @access Private
router.delete('/experience/:exp_id', checkAuth, (req, res) => {
     profileModel
          .findOne({ user : req.user.id })
          .then(profile => {
               const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id)
               profile.experience.splice(removeIndex, 1)
               profile
                    .save()
                    .then(profile => {
                         res.status(200).json(profile)
                    })
                    .catch(err => {
                         res.status(400).json(err)
                    })
          })
          .catch(err => {
               res.status(404).json(err)
          })
})

router.delete('/education/:edu_id', checkAuth, (req, res) => {
     profileModel
          .findOne({ user : req.user.id })
          .then(profile => {
               const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id)
               profile.education.splice(removeIndex, 1)
               profile
                    .save()
                    .then(profile => {
                         res.status(200).json(profile)
                    })
                    .catch(err => {
                         res.status(400).json({
                              message : err.message
                         })
                    })
          })
          .catch(err => {
               res.status(404).json({
                    message : err.message
               })
          })
})


module.exports = router
