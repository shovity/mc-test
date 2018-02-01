const User = require('./models/User')
const connect = require('./connect')

const master = new User({ username: 'master2', password: 'secret' })

master.save((err, master) => {
  console.log(err, master)
})
