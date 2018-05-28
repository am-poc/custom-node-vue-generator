const pg = require('pg')
const winston = require('winston')
const config = require('../config')

const opts = {
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    host: config.db.host, // Server hosting the postgres database
    port: config.db.port || 5432,
    max: 50, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

const pool = new pg.Pool(opts)

pool.query('SELECT $1::text as name', ['foo'])
    .then(() => {
        winston.info('Postgres connected')
    })
    .catch(err => {
        winston.error('PG connection error: ', err)
    })

pool.on('error', (err, client) => {
    winston.error('idle client error', err.message, err.stack)
})

module.exports.query = (text, values, callback) => {
    winston.info('query:', text, values)
    return pool.query(text, values, callback)
}

module.exports.connect = callback => pool.connect(callback)

module.exports.transaction = async callback => {
    const client = await pool.connect()
    let res
    try {
        await client.query('BEGIN')
        try {
            res = await callback(client)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}

