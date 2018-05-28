const winston = require("winston")
const Users = require("../models/User")

exports.add = function(values) {
	return new Promise((resolve, reject)=>{
		Users.insert(values)
		.then((response)=>{
			resolve(response)
		})
		.catch((err)=>{
			resolve(false)
		})
	})
}

exports.remove = function(req, res) {
	//console.log("is it working?")
	res.json({ message: "Remove User" })
}

exports.update = function(req, res) {
	//console.log("is it working?")
	res.json({ message: "Update User" })
}

exports.find = function(req, res) {
	//console.log("is it working?")
	res.json({ message: "Find User" })
}
