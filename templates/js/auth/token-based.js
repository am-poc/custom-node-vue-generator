
const Users = require('../models/User')
const winston = require("winston")
const passport = require('passport')
const jwt = require("jsonwebtoken")
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt")
jwtOptions.secretOrKey = process.env.AUTH_SECRET

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	Users.findById(jwt_payload.id)
	.then(user => {
		next(null, user)
	})
	.catch(err => {
		winston.error(err.message)
		next(err, null)
	})
}))

passport.serializeUser(function(user, done){
	done(null, user)
})

exports.authorizeRoute = (req, res, next) =>{
	passport.authenticate('jwt', { session: false })
	next()
}
// I am not using any passport strategy to authenticate user. The user is authenticated in the authController and then simply logged in to the passport system using the 'req.login()'. Passport is primarily used for route authorization in this project.



// not sure about this
passport.deserializeUser(function(user, done) {
	console.log(`deserialize ${user.id}`)
	Users.findById(user.id)
	.then(user => {
		//console.log(user)
		done(null, user)
	})
	.catch(err => {
		winston.error(err.message)
		done(err, null)
	})
})

// not sure about this
exports.getToken = (req, res, next) => {
	// check header or url parameters or post parameters for token
	const token = req.body.token || req.query.token || req.headers["x-access-token"]
}