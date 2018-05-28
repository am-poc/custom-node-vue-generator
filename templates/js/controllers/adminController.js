const User = require("../models/User")
const winston = require("winston")

exports.viewAllUsers = function(req, res) {
	let usersData = [
		{id: 1, name: 'Afshan', country: 'Pakistan'},
		{id: 2, name: 'Nathan', country: 'Ghana'},
		{id: 3, name: 'Kevin', country: 'USA'},
		{id: 4, name: 'Yaw', country: 'Ghana'}]
	
	res.json(usersData)
}

exports.addNewUser = function(req, res) {
	console.log("is it working?")
	// User.add()
    res.json({ message: "Admin Added New User" })
}

exports.viewAllSessions = function(req, res, next) {
	let sessionsData = [
		{id: 1, name: 'Karachi Session', date: '1-May-2018', country: 'Pakistan'},
		{id: 2, name: 'Accra Session',   date: '5-May-2018', country: 'Ghana'},
		{id: 3, name: 'Denver Session',  date: '10-May-2018',country: 'USA'},
		{id: 4, name: 'Dubai Session',   date: '15-May-2018',country: 'UAE'}]
	
	res.json(sessionsData)
}

exports.addNewSession = function(req, res) {
	res.json({ message: "Admin Added New Session" })
}

exports.search = function (req, res) {
	let searchResults = [
		{deploymentId: 1, name: 'Karachi Session', startDate: '1-May-2018', country: 'Pakistan'},
		{deploymentId: 2, name: 'Accra Session',   startDate: '5-May-2018', country: 'Ghana'},
		{deploymentId: 3, name: 'Denver Session',  startDate: '10-May-2018',country: 'USA'},
		{deploymentId: 4, name: 'Dubai Session',   startDate: '15-May-2018',country: 'UAE'}]
	
	res.json(searchResults)
}