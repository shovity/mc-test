const express = require('express')

const user = require('./user')
const auth = require('./auth')

const v1 = express.Router()

// REST api
v1.use('/user', user)
v1.use('/auth', auth)

module.exports = v1
