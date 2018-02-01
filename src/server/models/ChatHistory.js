const mongoose = require('mongoose')

const chatHistorySchema = mongoose.Schema({
  userx: String,
  messages: [
    { sender: String, content: String, users_readed: [ String ] }
  ],
  created_date: { type: Date, default: Date.now }
})

const Post = mongoose.model('ChatHistory', chatHistorySchema)

module.exports = Post
