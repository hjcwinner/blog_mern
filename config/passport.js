const {Strategy, ExtractJwt} = require('passport-jwt')
const userModel = require('../model/user')
const passport = require('passport')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY

module.exports = passport => {
    passport.use(
        new Strategy(opts, (jwt_payload, done) => {
            userModel
                .findById(jwt_payload.id)
                .then(user => {
                    if(user)
                    {
                        return done(null, user)
                    }
                    else
                    {
                        return done(null, false)
                    }
                })
                .catch(err => console.log(err))
        })
    )
}

