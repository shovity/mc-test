const express = require('express')
const ChatHistory = require('../../models/ChatHistory')

const chatHistoryApi = express.Router()

// GET
chatHistoryApi.get('/', (req, res, next) => {
  const { username } = req
  const { target, recents } = req.query
  const userx = [username, target]

  // guest can not chat
  if (!username) return res.json({ err: 'You must login to use chat' })


  // get recents messages
  if (recents) {
    return ChatHistory.find({ userx: username }).sort({ modified_date: 'desc' }).exec((err, recents) => {
      res.json({ err, recents })
    })
  }

  // throw err when send chat to own
  if (username === target) return res.json({ err: 'you can not make chat to you' })

  ChatHistory.findOne({ userx: { $all: [target, username] } }, (err, data) => {
    if (err) return res.json({ err })

    if (data) {
      // history exists
      res.json({ messages: data.messages, target })
      // remove unread flag
      if (data.unread === username) {
        console.log('remove unred')
        ChatHistory.findByIdAndUpdate(data._id, { $set: {unread: ''} }, (err) => {
          console.log('updated',err)
        })
      }
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

// get unread message
chatHistoryApi.get('/unread', (req, res, next) => {
  const { username } = req

  ChatHistory.find({ userx: username, unread: username }, (err, datas) => {
    if (err) return res.json({ err })
    const unreads = datas.map(d => d.userx.filter(u => u !== username)[0])
    return res.json({ unreads })
  })
})

// set chat readed
chatHistoryApi.put('/', (req, res, next) => {
  const { username } = req
  const { target } = req.body

  ChatHistory.findOneAndUpdate(
    {
      userx: { $all: [ target, username ] },
      unread: username
    },
    {
      $set: { unread: '' }
    },
    (err) => {
      if (err) return res.json({ err })
      return res.json({ message: 'set readed success' })
    }
  )
})

module.exports = chatHistoryApi
