const express = require('express')
const router = express.Router()
const passport = require('passport')
const { validationResult } = require('express-validator')

const postModel = require('../model/post')

const checkAuth = passport.authenticate( 'jwt', { session : false })

const {
    validPost
} = require('../helper/validation')

//@router    Post  http://localhost:3030/post
//@desc      post from user
//@access    private
router.post('/', checkAuth, validPost, (req, res) => {
   
    const newPost = new postModel({
        user : req.user.id,
        text : req.body.text,
        name : req.user.name,
        avatar : req.user.avatar
    })

    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(404).json(errors)
    }
    else
    {
        newPost
        .save()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
    }
})

//@router    Get  http://localhost:3030/post/total
//@desc      Total Get post
//@access    Public
router.get('/total', (req, res) => {

    postModel
        .find()
        .populate('user', ["name", "email", "avatar"])
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(404).json({
                message : err.message
            })
        })
})

//@router    Get  http://localhost:3030/post/:postid
//@desc      Total Get post
//@access    Private
router.get('/:postid', checkAuth, (req, res) => {

    postModel
        .findById(req.params.postid)
        .populate("user",["name",'email','avatar'])
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(404).json({
                message : err.message
            })
        })
})

//@router    Delete  http://localhost:3030/post/:postid
//@desc      Total Delete post
//@access    Private
router.delete('/:postid', checkAuth, (req, res) => {

    postModel
        .findByIdAndDelete(req.params.postid)
        .then(() => {
            res.status(200).json({
                message : "Deleted Post"
            })
        })
        .catch(err => {
            res.status(404).json({
                message : err.message
            })
        })
})

//@router    Patch  http://localhost:3030/post/:postid
//@desc      Total Patch post
//@access    Private
router.patch('/:postid', checkAuth, (req, res) => {

    const postFields = {}

    postFields.user = req.user.id
    postFields.name = req.user.name
    postFields.avatar = req.user.avatar
    if(req.body.text) postFields.text = req.body.text


    postModel
        .findByIdAndUpdate(
            req.params.postid,
            { $set : postFields },
            { new: true })
        .then(post => res.status(200).json(postFields))
        .catch(err => res.status(404).json(err.message))

        
})





module.exports = router