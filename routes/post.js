const express = require('express')
const router = express.Router()
const passport = require('passport')

const postModel = require('../model/post')

const checkAuth = passport.authenticate( 'jwt', { session : false })


const {
    validPost
} = require('../helper/validation')
const { post_post, post_get_total, post_get_detail, post_patch, post_delete } = require('../controllers/post')

//@router    Post  http://localhost:3030/post
//@desc      post from user
//@access    private
router.post('/', checkAuth, validPost, post_post)

//@router    Get  http://localhost:3030/post/total
//@desc      Total Get post
//@access    Public
router.get('/total', post_get_total)

//@router    Get  http://localhost:3030/post/:postid
//@desc      Total Get post
//@access    Private
router.get('/:postid', checkAuth, post_get_detail)

//@router    Delete  http://localhost:3030/post/:postid
//@desc      Total Delete post
//@access    Private
router.delete('/:postid', checkAuth, post_delete)

//@router    Patch  http://localhost:3030/post/:postid
//@desc      Total Patch post
//@access    Private
router.patch('/:postid', checkAuth, post_patch)


//@router   POST  http://localhost:3030/post/like/:postid
//@desc     Like post
//@access   Private
router.post('/like/:postid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ 
                    message : "User already liked this post"
                })
            }
            else
            {
                post.likes.unshift({ user : req.user.id })
                post.save().then(post => res.status(200).json(post))
            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
})

//@router   POST http://localhost:3030/post/unlike/:postid
//@desc     Unlike post
//@access   private
router.post('/unlike/:postid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({
                    message : "you have not liked this post"
                })
            }
            else
            {
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id)
                post.likes.splice(removeIndex, 1)

                post.save().then(post => res.status(200).json(post))
            }
        })
        .catch(err => {
            res.status(500).json({
                message : err.message
            })
        })
})

//@router   POST  http://localhost:3030/post/comment/:postid
//@desc     Add comment to post
//@access   Private
router.post('/comment/:postid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            const newComment = {
                text : req.body.text,
                user : req.user.id,
                name : req.user.name,
                avatar : req.user.avatar
            }

            post.comments.unshift(newComment)
            post
                .save().then(post => res.status(200).json(post))

        })
        .catch(err => {
            res.status(404).json({
                message : err.message
            })
        })
})

//@router   Delete  http://localhost:3030/post/comment/:posttid/:commentid
//@desc     DElete comment from post
//@access   Private
router.delete('/comment/:postid/:commentid', checkAuth, (req, res) => {
    postModel
        .findById(req.params.postid)
        .then(post => {
            if(post.comments.filter(comment => comment.id.toString() === req.params.commentid).length === 0)
            {
                return res.status(400).json({
                    message : "You have not comment this post"
                })
        
            }
            else
            {
                 const removeIndex = post.comments
                    .map(item => item.id.toString())   
                    .indexOf(req.params.commentid)
                    post.comments.splice(removeIndex, 1)

                    post.save().then(post => res.status(200).json(post))
            }
        })
        .catch(err => {
            res.status(404).json({
                message : err.message
            })
        })
})


module.exports = router