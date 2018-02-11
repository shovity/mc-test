const mongoose = require('../mongoose')

const testLogSchema = mongoose.Schema({
  test_id: String,
  username: String,
  point: { type: Number, default: 0 },
  answers: [ String ],
  times: [ Number ],
  time_current_question: { type: Number, default: 0 },
  modifined_date: { type: Date, default: Date.now },
  created_date: { type: Date, default: Date.now }
})

const TestLog = mongoose.model('TestLog', testLogSchema)

module.exports = TestLog
