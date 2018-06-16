const User = require("../models/mongo/User")
const Feature = require("../models/mongo/Feature")
const Layer = require("../models/mongo/Layer")
const Map = require("../models/mongo/Map")
const Upload = require("../models/mongo/Upload")
const winston = require("winston")

// get maps only if the user is authorized to see them
exports.getAuthorizedMaps = async (req, res) => {
	//console.log(req.user)
	const logged_in_user = 'admin' //req.user.username
	
	try{
		let maps = await Map.findAuthorized(logged_in_user)
		res.json(maps)
	}catch(err){
		console.log(err)
		res.json({message: 'Serverside error'})
	}
	
}

exports.getUploadedFiles = async (req, res) => {
	try{
		const uploads = await Upload.findAll()
		res.json(uploads)
	}catch(err){
		console.log(err)
		res.json({message: 'Serverside error'})
	}
	
}

exports.getMapData = async (req, res) => {
	let mapData = await Map.findBySlugAndPopulate(req.params.slug)
	res.json(mapData)
}

exports.getAllUsers = function(req, res) {
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

exports.upload = async (req, res) => {
	console.log(req.body)
	console.log(req.file)
	console.log(req.query)
	console.log(req.params)
	/*const file = req.file
	if (!file) {
		return res.status(400).json({ message: 'No file received' })
	}
	console.log(file)*/
	/*const uploadDoc = new Upload({
		originalName: file.originalname,
		savedName: file.filename,
		uploadDate: Date.now(),
		size: file.size
	})
	
	await uploadDoc.save()
	await saveGeojsonToDB(file.path, file.filename, file.originalname, uploadDoc.id)
	await Upload.update({ _id: uploadDoc.id }, { $set: { beenProcessed: true } }).exec()*/
	res.json({ uploadId: 'id', message: 'File uploaded and processed' })
}