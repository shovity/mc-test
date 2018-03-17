const express = require('express')
const Notification = require('../../models/Notification')

const notifications = express.Router()

// POST
notifications.get('/', (req, res, next) => {
  const { username } = req

  Notification.find({
      users_readed: {
        $nin: [ username ]
      }
    }, (err, notifications) => {
    if (err) return res.json({ err })
    return res.json({ notifications })
  })
})

// PUT
notifications.put('/', (req, res, next) => {
  const { username, body } = req

  Notification.findByIdAndUpdate(body.id, {
      $push: { users_readed: username }
    }, (err, notifications) => {
    if (err) return res.json({ err })
    return res.json({ success: true })
  })
})

module.exports = notifications
