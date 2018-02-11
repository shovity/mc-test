const mongoose = require('../mongoose')

const chatHistorySchema = mongoose.Schema({
  userx: [String],
  unread: String,
  messages: [
    { sender: String, content: String }
  ],
  created_date: { type: Date, default: Date.now },
  modified_date: { type: Date, default: Date.now }
})

const Post = mongoose.model('ChatHistory', chatHistorySchema)

module.exports = Post
