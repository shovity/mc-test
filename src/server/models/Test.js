const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
  title: String,
  quests: [
    {
      content: String,
      true_answer: String,
      answers: [
        {
          label: String,
          content: String
        }
      ]
    }
  ],
  created_date: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', testSchema)

module.exports = Post
