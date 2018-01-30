const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  content: String,
  onwer: String,
  createdDate: { type: Date, default: Date.now },
  comments: [{ username: String, content: String }],
  voteUp: { type: Number, default: 0 },
  voteDown: { type: Number, default: 0 }
})

const Post = mongoose.model('Post', userSchema)

module.exports = Post
