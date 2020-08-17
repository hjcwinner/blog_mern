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

exports.validProfile = [
    check('handle', 'Handle is required').notEmpty()
       .isLength( {min : 4, max : 25 } )
       .withMessage('handle must be between 4 to 25 characters'),
    check('status', 'status is required').notEmpty(),
    check('skills', 'skills is required').notEmpty(),
    
]

exports.validPost = [
    check('text', 'text is required').notEmpty()
        .isLength( { min : 10, max : 50 })
        .withMessage('text must be between 10 to 50 characters')
]

exports.validExp = [
    check('title', 'Title is required').notEmpty()
        .isLength({ min : 4, max : 35 })
        .withMessage('title must be between 4 to 35 characters'),
    check('company', 'company is required').notEmpty()
        .isLength({ min : 4, max : 35 })
        .withMessage('company must be between 4 to 35 characters'),
    check('from', 'From is required').notEmpty()
]

exports.validEdu = [
    check('school', 'school is required').notEmpty()
        .isLength({ min : 4, max : 35 })
        .withMessage('school must be between 4 to 35 characters'),
    check('degree', 'degree is required').notEmpty()
        .isLength({ min : 4, max : 35 })
        .withMessage('degree must be between 4 to 35 characters'),
    check('fieldofstudy', 'fieldofstudy is required').notEmpty()
        .isLength({ min : 4, max : 35 })
        .withMessage('fieldofstudy must be between 4 to 35 characters'),
    check('from', 'From is required').notEmpty()
]

