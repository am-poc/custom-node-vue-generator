const express = require('express')
const authCtrl = require('../controllers/authController')
const router = new express.Router()
/*
TODO: start all over again, find the best authentication method
https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46
https://blog.risingstack.com/node-hero-node-js-authentication-passport-js/
https://medium.com/of-all-things-tech-progress/starting-with-authentication-a-tutorial-with-node-js-and-mongodb-25d524ca0359
https://www.codementor.io/kgasta/nodejs-authentication-methods-e0c0i6k40

(jwt, bcrypt, passport)
There are two concepts to remember:
1. User Authentication
1.1 a user needs to login and authenticated. This is done in a vanilla fashion (find username in database, then compare passwords). We need bcrypt to create/compare password hashes.
1.2. user loin/authentication could be token-based in which case we need the JWT package too, or it could be session based.
2. Resource Authorization
2.1 API endpoints need to be secured. This is done with the help fo 'passport'. Essentially, each time an endpoint is requested, the user is checked to be authenticated.
2.2. BUT user authentication can be done using passport too!
*/

/*jsonwebtoken vs passport-jwt
jsonwebtoken:
An implementation of JSON Web Tokens.
This was developed against draft-ietf-oauth-json-web-token-08. It makes use of node-jws
This needs 'jws'


passport-jwt:
A Passport strategy for authenticating with a JSON Web Token.
This module lets you authenticate endpoints using a JSON web token. It is intended to be used to secure RESTful endpoints without sessions.

HURRAH!! the passport-jwt uses 'jsonwebtoken'
*/


/*bcrypt vs bcryptjs*/


router.post('/login', authCtrl.authenticateUser)
router.post('/register', authCtrl.registerUser)
router.post('/logout', function(req, res) {
	req.logout()
	console.log("auth route post /logout")
	res.send({loggedOut: true, message: "Hi from the post auth/logout router/controller"})
})

module.exports = router