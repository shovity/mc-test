const mongoose = require('mongoose')
const assert = require('assert')
const MONGODB_CONNECT_URL = process.env.MONGODB_CONNECT_URL

mongoose.connect(
  MONGODB_CONNECT_URL,
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
