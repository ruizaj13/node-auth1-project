const express = require('express')
const router = express.Router()
const protected = require('../auth/auth-middleware')
const Users = require('./users-model')

router.get('/', protected, (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = router

//line 1 and 2 can be reduced to const router = require("express").Router()