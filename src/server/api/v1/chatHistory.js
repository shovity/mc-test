const express = require('express')
const ChatHistory = require('../../models/ChatHistory')

const chatHistory = express.Router()

// GET
chatHistory.get('/', (req, res, next) => {
  const { username } = req
  const { target } = req.query
  const userx = [username, target].sort().join('-')

  // guest can not chat
  if (!username) return res.json({ err: 'You must login to use chat' })

  // throw err when send chat to own
  if (username === target) return res.json({ err: 'you can not make chat to you' })

  ChatHistory.findOne({ userx }, (err, data) => {
    if (err) return res.json({ err })

    if (data) {
      // history exists
      res.json({ messages: data.messages, target })
    } else {
      // create history
      const chatHistory = new ChatHistory({ userx })

      chatHistory.save((err) => {
        if (err) return res.json({ err })
        res.json({ messages: [], target })
      })
    }
  })
})

module.exports = chatHistory
