const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Jwt = require('passport-jwt')
const Users = require('../models/User')
const JwtStrategy = Jwt.Strategy
const winston = require("winston")

passport.serializeUser(function(user, done) { done(null, user.gid)})

passport.deserializeUser(function(id, done) {
    Users.findById(id)
        .then(user => {
            done(null, user)
        })
        .catch(err => {
	        winston.error(err.message)
            done(err, null)
        })
})

passport.use('local-login', new LocalStrategy(
    ((username, password, done) => {
        Users.findByUsername(username)
            /*.then(data => {
                const user = data.rows[0]
                if (data.rowCount === 1 && Users.comparePassword(password, user.password_hash)) {
                    return done(null, user)
                }
                return done(null, false, 'Invalid email or password.')
            })
            .catch(err => {
                done(err, null)
            })*/
    })
))

const opts = {
    secretOrKey: process.env.AUTH_SECRET,
    jwtFromRequest: Jwt.ExtractJwt.fromAuthHeader()
}
passport.use(new JwtStrategy(opts, ((jwtPayload, done) => {
    Users.findById(jwtPayload.id)
        .then(result => {
            if (result.rowCount === 1) {
                done(null, result.rows[0])
            } else {
                done(null, false, 'Invalid user')
            }
        })
        .catch(err => {
            done(err, false)
        })
})))

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    //req.flash('info', 'You need to login to access that page')
    res.redirect(`/login?redirectTo=${req.originalUrl}`)
}
