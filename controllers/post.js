const postModel = require('../model/post')
const { validationResult } = require('express-validator')

exports.post_post = (req, res) => {
   
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
}

exports.post_get_total = (req, res) => {

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
}

exports.post_get_detail = (req, res) => {

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
}

exports.post_delete = (req, res) => {

    postModel
        .findById(req.params.postid)
        .then(post => {
            if(post.user.toString() !== req.user.id)
            {
                return res.status(401).json({
                    message : "user not authorized"
                })
            }
            else
            {
                post
                    .remove()
                    .then(() => res.status(200).json({ success : true }))

            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
}

exports.post_patch = (req, res) => {

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
}

