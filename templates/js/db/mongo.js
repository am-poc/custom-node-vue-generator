//connect to MongoDB database
const mongoose = require('mongoose');
const logger = require('winston');
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/customapp'

mongoose.Promise = global.Promise
mongoose.connect(mongoUrl)
mongoose.connection.on('error', () => {
	logger.error('MongoDB Connection Error. Please make sure that MongoDB is running.')
	process.exit(1)
})
mongoose.connection.on('connected', function(){
	logger.info('MongoDB Connected')
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});
// end of MongoDB connection



