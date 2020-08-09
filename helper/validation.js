const { check } = require('express-validator')


exports.validSignup = [
    check('name', 'Name is required').notEmpty()
        .isLength({ min : 4, max : 32 })
        .withMessage('name must be between 4 to 32 characters'),
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password', 'Password is required').notEmpty(),
    check('password')
        .isLength( { min : 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
]

exports.validSignin = [
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password', 'Password is required').notEmpty(),
    check('password')
        .isLength( { min : 6} )
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
]
