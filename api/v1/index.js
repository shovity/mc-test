const express = require('express')

const user = require('./user')
const auth = require('./auth')
const post = require('./post')
const chatHistory = require('./chatHistory')

const v1 = express.Router()

// REST api
v1.use('/user', user)
v1.use('/auth', auth)
v1.use('/post', post)
v1.use('/chatHistory', chatHistory)

module.exports = v1
