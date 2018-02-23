const mongoose = require('../mongoose')

const questionSchema = mongoose.Schema({
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
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
