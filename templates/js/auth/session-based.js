/* Session-based Authentication: The following is for storing the logged-in user in session */
const express = require('express');
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.APP_SECRET || 'default-secret',
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 24 * 60 * 60, // = 1 day.
		autoReconnect: true
	})
}))