const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')
const router = express.Router()

router.post('/register', (req, res) => {
  const { EMAIL, PASSWORD, FULL_NAME, PHONE_NO } = req.body
  const encryptedPassword = String(cryptoJs.SHA256(PASSWORD))
  const sql = `INSERT INTO USER(EMAIL, PASSWORD, FULL_NAME, PHONE_NO) VALUES(?,?,?,?)`
  pool.query(
    sql,
    [EMAIL, PASSWORD, FULL_NAME, PHONE_NO],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

router.post('/login', (req, res) => {
  const { EMAIL, PASSWORD } = req.body
  const encryptedPassword = String(cryptoJs.SHA256(PASSWORD))
  const sql = `SELECT * FROM USERS WHERE email = ? AND password = ?`
  pool.query(sql, [EMAIL, encryptedPassword], (error, data) => {
    if (data) {
      if (data.length != 0) {
        const payload = {
          userId: data[0].id,
        }
        const token = jwt.sign(payload, config.secret)
        const body = {
          token: token,
          ID: data[0].ID,
          FULL_NAME: data[0].FULL_NAME,
          PHONE_NO: data[0].PHONE_NO,
          CREATED_TIME: data[0].CREATED_TIME
        }
        res.send(result.createSuccessResult(body))
      } else res.send(result.createErrorResult('Invalid email or password'))
    } else res.send(result.createErrorResult(error))
  })
})


module.exports = router
