const db = require('../../db/pg')
const table = 'users'

exports.insert = (values) => {
	const sqlQuery = 'INSERT INTO users(username, first_name, middle_name, last_name, email, phone, gender, role, password) ' +
		'VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ' +
		'RETURNING gid'
	return db.query(sqlQuery, [values.username, values.firstname, values.middlename, values.lastname, values.email, values.phone, values.gender, values.type, values.password])
}

exports.changePassword = (id, hashedPassword) =>{
	const query = `UPDATE users SET password_hash = $1 WHERE gid = $2`
	const values = [hashedPassword, id]
	return db.query(query, values)
}

exports.isUsernameUnique = (username) =>{
	return db.query("SELECT username FROM users WHERE username = $1", [username])
}

exports.findById = (id) => {
	return db.query(`SELECT * FROM ${table} WHERE gid = $1`, [id])
}

exports.findByUsername = (username) => {
	return db.query(`SELECT * FROM ${table} WHERE username = $1`, [username])
}

exports.findAll = (limit = 20, step = 0) => {
	return db.query(`SELECT * FROM ${table} LIMIT $1 OFFSET $2`, [limit, step])
}

exports.getEnumerators = (limit = 20, step = 0) => {
	let admins = db.query(`SELECT * FROM ${table} WHERE user_type = 'admin'`)
	let users = db.query(`SELECT * FROM ${table} WHERE user_type = 'enumerator'`)
	return Promise.all([admins,users])
}



