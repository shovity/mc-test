const express = require('express')

const User = require('../../models/User')

const user = express.Router()

user.get('/', (req, res, next) => {
  User.find({}, (err, allMembers) => {
    if (err) return res.json({ err })
    return res.json({ allMembers })
  })
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
