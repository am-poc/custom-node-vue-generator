const express = require('express');
const apiCtrl         = require('../controllers/apiController')
const router = new express.Router();


router.get('/testing', function(req, res){
	res.json({message: "Hi from the api router/controller"})
})

module.exports = router;
