const mongoose = require('../mongoose')

const testSchema = mongoose.Schema({
  title: String,
  subject: String,
  quests: [
    {
      content: String,
      true_answer: String,
      subject: String,
      tags: [ String ],
      level: Number,
      onwer: String,
      answers: [
        {
          label: String,
          content: String
        }
      ],
      created_date: { type: Date, default: Date.now }
    }
  ],
  author: String,
  require_level: Number,
  time: Number, // secends
  descriptions: String,
  created_date: { type: Date, default: Date.now }
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test
