const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_KEY_JWT
const io = socket()

// { id(socket-id): string, username: string, status: string }
let users = []

// emit update event to all client
const updateUsers = () => {
  io.emit('update users', users)
}

// CONNECTION
io.on('connection', (socket) => {
  // event login
  socket.on('login', (token) => {
    if (!token) {
      // guest
      users.push({ username: 'Guest', id: socket.id, status: 'online' })
    } else {
      // user
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return socket.emit('login failed')
        const user = users.find(user => user.username === decoded.username)
        if (!user) {
          users.push({ username: decoded.username, id: socket.id, status: 'online' })
        } else {
          user.id = socket.id
        }
      })
    }

    updateUsers()
  })

  // disconent event
  socket.on('disconnect', () => {
    const userIndex = users.findIndex(user => user.id === socket.id)
    if (userIndex !== -1) users.splice(userIndex, 1)
    updateUsers()
  })
})

module.exports = io
