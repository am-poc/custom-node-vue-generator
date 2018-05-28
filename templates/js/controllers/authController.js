const winston = require("winston")
const passport = require('passport')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const userCtrl = require("../controllers/userController")
const Users = require("../models/User")

exports.registerUser = async (req, res)=>{
	let userData = req.body
	const salt = bcrypt.genSaltSync()
	userData.password = bcrypt.hashSync(userData.password, salt)
	
	let registered = await userCtrl.add(userData)
	res.send({registered: registered.rowCount === 1})
}

exports.authenticateUser = async (req, res) => {
    req.checkBody("username", "Invalid username").notEmpty()
    req.checkBody("password", "Invalid password").notEmpty()
    const errors = req.validationErrors()
    if (errors) {
        return res.status(400).json({ message: "Bad request" })
    }
 
    try{
	    let userRows    = await Users.findByUsername(req.body.username)
	    let user        = userRows.rows[0]
	    let userCount   = userRows.rowCount
	    if (userCount === 1){
	        let pwdCheck= bcrypt.compareSync(req.body.password, user.password)
	    	if (pwdCheck){
			    const token = `JWT ${jwt.sign({ id: user.gid }, process.env.AUTH_SECRET)}`
			    const authenticatedUser = {
				    gender: user.gender,
				    id: user.gid,
				    username: user.username,
				    role: user.role,
				    name: `${user.firstname || ""} ${user.middlename || ""} ${user.lastname || ""}`.trim(),
				    token
			    }
			    
			    // put the user in the passport system
			    req.login(authenticatedUser, function(err){
			    	if (err)    console.log(err)
				    res.status(200).json({authenticated: true, authenticatedUser})
			    })
		    }else{
			    res.json({authenticated: false, message: "password incorrect" })
			    //HTTP Error 401 - Unauthorized: Access is denied due to invalid credentials.
		    }
	    }else {
		    res.json({authenticated: false, message: "username incorrect" })
		    //HTTP Error 401 - Unauthorized: Access is denied due to invalid credentials.
	    }
    }catch(err){
		winston.error(err.message)
		res.json({authenticated: false, message: "Other Server error" })
	    // HTTP Error 500 - server errors
	}
}

