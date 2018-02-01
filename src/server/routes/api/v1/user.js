const express = require('express')

const User = require('../../../models/User')

const user = express.Router()

user.get('/', (req, res, next) => {
  res.json({ what: 'user apis' })
})

// POST
user.post('/', (req, res, next) => {
  const { username, password } = req.body
  User.addUser(username, password, (err, data) => {
    const { username, token } = data || {}
    res.json({ err, token, username })
  })
})

module.exports = user
