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
router.post('/likes/:postid', checkAuth, (req, res) => {
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

module.exports = router