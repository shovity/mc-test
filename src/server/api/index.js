const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const v1 = require('./v1')

const api = express.Router()
const secret = process.env.SECRET_KEY_JWT

// authen middleware
api.use((req, res, next) => {
  const token = req.get('x-access-token') || ''
  if (!token) return next()
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return next(err)

    const { username, level } = decoded || {}
    req.username = username
    req.level = level
    return next()
  })
})

// REST api
api.use('/api/v1', v1)

module.exports = api
