const express = require('express')
const User = require('../../../models/User')

const auth = express.Router()

// POST
auth.post('/', (req, res, next) => {
  const { username, password } = req.body

  User.auth(username, password, (err, token) => {
    if (err) {
      res.json({ err })
    } else {
      res.json({ token, username })
    }
  })
})

module.exports = auth
