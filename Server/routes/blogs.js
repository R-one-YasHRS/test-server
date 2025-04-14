const express = require('express')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const pool = require('../db/db')
const result = require('../utils/result')
const config = require('../utils/config')

const router = express.Router()

//CREATE BLOG
router.post('/blogs', (req, res) => {
    const { TITLE, CONTENTS, USER_ID, CATEGORY_ID} = req.body
    const sql = `INSERT INTO BLOGS(TITLE, CONTENTS, USER_ID, CATEGORY_ID) VALUES(?,?,?,?)`
    pool.query(
        sql,
        [TITLE, CONTENTS, USER_ID, CATEGORY_ID],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

//SEARCH BLOG BY SEARCHING TITLE
router.get('/blogs', (req, res) => {
    const ID = req.params.TITLE
    const sql = `SELECT ID, TITLE, CONTENTS, CREATED_TIME, USER_ID, CATEGORY_ID FROM BLOGS WHERE TITLE = ?`
    pool.query(sql, [req.headers.userId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

//SEARCH BLOG BY SEARCHING ID
router.get('/blogs', (req, res) => 
    const ID = req.params.ID
    const sql = `SELECT ID, TITLE, CONTENTS, CREATED_TIME, USER_ID, CATEGORY_ID FROM BLOGS WHERE ID = ?`
    pool.query(sql, [req.headers.userId], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

//SEARCH ALL BLOG 
router.get('/blogs', (req, res) => {
    const sql = `SELECT ID, TITLE, CONTENTS, CREATED_TIME, USER_ID, CATEGORY_ID FROM BLOGS`
    pool.query(sql, /*[req.headers.userId],*/ (error, data) => {
        res.send(result.createResult(error, data))
    })
})

//DELETE BLOG
router.delete('/BLOGS/:ID', (req, res) => {
    const ID = req.params.id
    const sql = `DELETE FROM BLOGS WHERE id = ?`
    pool.query(
        sql,
        [ID],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

//EDIT BLOGS
router.put('/blogs', (req, res) => {
    const { TITLE, CONTENTS, USER_ID, CATEGORY_ID } = req.body
    const sql = `UPDATE BLOGS SET TITLE=?, CONTENTS=?, USER_ID=?, CATEGORY_ID=? WHERE id = ?`
    pool.query(
        sql,
        [TITLE, CONTENTS, USER_ID, CATEGORY_ID, req.headers.userId],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})



module.exports = router
