const mongoose = require('mongoose')
const assert = require('assert')

mongoose.connect(
  'mongodb://127.0.0.1/mc-test',
  { useMongoClient: true }
)

// use native promises
mongoose.Promise = global.Promise;

// get database
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function() {
  console.log("mongodb is connected!")
})

module.exports = mongoose
