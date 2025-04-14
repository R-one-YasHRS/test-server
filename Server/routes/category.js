const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')
const router = express.Router()

router.post('/category', (req, res) => {
  const { TITLE, DESCRIPTION } = req.body
  const sql = `INSERT INTO CATEGORIES(TITLE, DESCRIPTION) VALUES(?,?)`
  pool.query(
    sql,
    [TITLE, DESCRIPTION],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

router.get('/category', (req, res) => {
  const sql = `SELECT  TITLE, DESCRIPTION FROM CATEGORIES WHERE id = ?`
  pool.query(sql, [req.headers.userId], (error, data) => {
    res.send(result.createResult(error, data))
  })
})


module.exports = router
