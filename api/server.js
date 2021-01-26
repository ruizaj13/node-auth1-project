const express = require('express')
const userRouter = require('./users/users-router')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const server = express()

server.use('/api/users', userRouter)
server.use(express.json())

server.get('/', (req, res) => {
    res.json('up and running')
})

module.exports = server