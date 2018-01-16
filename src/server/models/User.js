const mongoose = require('mongoose')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const jwtSecrect = process.env.SECRET_KEY_JWT

const userSchema = mongoose.Schema({
  username: String,
  password: String
})

userSchema.methods.show = function () {
  console.log(`Hi! i am ${this.name}`)
}

const User = mongoose.model('User', userSchema)

User.auth = (username, password, callback) => {
  console.log(username, password + '.')
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
  if (username.length < 6 || username.length > 12) {
    errors.push('username.length < 6 || username.length > 12')
  }

  if (password.length < 6 || password.length > 12) {
    errors.push('password.length < 6 || password.length > 12')
  }

  if (errors.length !== 0) {
    return callback(errors)
  }

  User.findOne({ username }, (err, user) => {
    if (err) {
      return callback([ err ])
    }

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
