require('dotenv').config()
// is needed for the frontend to access the environment and configuration variables
module.exports = {
	port: process.env.PORT,
	cookie: {
		secret: process.env.AUTH_SECRET
	},
	db: {
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		name: 'farm_data_testcafe',
		port: process.env.PG_PORT
	},
	log: 'debug',
	sentry_dsn: process.env.SENTRY_DSN || ''
}
