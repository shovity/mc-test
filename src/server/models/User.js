const mongoose = require('../mongoose')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const jwtSecrect = process.env.SECRET_KEY_JWT

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  adress: String,
  email: String,
  phone: String,
  fullName: String,
  level: { type: Number, default: 0 },
  created_date: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

User.auth = (username, password, callback) => {
  User.findOne({ username, password: md5(password) }, (err, user) => {
    if (err) return callback(err)

    if (user) {
      const token = jwt.sign({ username }, jwtSecrect)
      callback(null, token)
    } else {
      callback('Username or password not match')
    }
  })
}

User.addUser = (username = '', password = '', callback) => {
  const errors = []

  // validate
  if (username.length < 2 || username.length > 12) {
    errors.push('Username length invalid. ')
  }

  if (password.length < 6 || password.length > 12) {
    errors.push('Password length invalid. ')
  }

  if (errors.length !== 0) {
    return callback(errors)
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      return callback([ err ])
    }
    console.log('exists', user)
    // check exists
    if (user !== null) {
      return callback(['username is exists'])
    }

    const newUser = new User({ username, password: md5(password) })

    newUser.save((err) => {
      if (err) return callback([ err ])
      const token = jwt.sign({ username }, jwtSecrect)
      callback(null, { username, token })
    })

  })
}

module.exports = User
