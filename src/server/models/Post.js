const mongoose = require('../mongoose')

const postSchema = mongoose.Schema({
  content: String,
  onwer: String,
  comments: [{ username: String, content: String }],
  vote_up: { type: Number, default: 0 },
  vote_down: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
