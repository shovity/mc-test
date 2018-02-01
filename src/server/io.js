const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_KEY_JWT
const io = socket()

// { id(socket-id): string, username: string, status: string }
let members = []
let total = 0

// emit update event to all client
const updateUsers = () => {
  io.emit('update users', { members, total })
}

// middleware
io.use((socket, next) => {
  // console.log(socket.request.headers.cookie)
  return next();
});

// CONNECTION
io.on('connection', (socket) => {
  total++
  updateUsers()

  // event login
  socket.on('login', data => {
    jwt.verify(data.token, secret, (err, decoded) => {
      if (err) return console.log(err)
      const user = members.find(user => user.username === decoded.username)

      if (!user) {
        members.push({
          username: decoded.username,
          socketId: socket.id,
          status: 'online'
        })
      } else {
        user.id = socket.id
      }
    })

    updateUsers()
  })

  // logout
  socket.on('logout', data => {
    jwt.verify(data.token, secret, (err, decoded) => {
      if (err) return console.log(err)
      const userIndex = members.findIndex(user => user.username === decoded.username)
      if (userIndex !== -1) members.splice(userIndex, 1)
      updateUsers()
    })
  })

  // disconent event
  socket.on('disconnect', () => {
    total--
    const userIndex = members.findIndex(user => user.id === socket.id)

    updateUsers()
  })
})

module.exports = io
