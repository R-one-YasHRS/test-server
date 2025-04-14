const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'DEV_AY',
    password: 'manager',
    database: 'hackathon'
})

module.exports = pool