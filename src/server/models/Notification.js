const mongoose = require('../mongoose')

const notificationSchema = mongoose.Schema({
  title: String,
  content: String,
  pusher: String,
  expired: { type: Date, default: () => Date.now() + 360*24*60*60*1000 },
  users_readed: [ String ],
  created_date: { type: Date, default: Date.now },
  modified_date: { type: Date, default: Date.now },
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
