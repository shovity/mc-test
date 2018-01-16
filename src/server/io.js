const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const jwtSecrect = process.env.JWT_SECRET


const io = socket()

let users = [] // { id: string, username: string, status: string }

const updateUsers = () => {
  io.emit('update users', users)
}

io.on('connection', (socket) => {
  // event login
  socket.on('login', (token) => {
    if (!token) {
      // guest
      users.push({ username: 'Guest', id: socket.id, status: 'online' })
    } else {
      // user login
      jwt.verify(token, jwtSecrect, (err, decoded) => {
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

  socket.on('disconnect', () => {
    const userIndex = users.findIndex(user => user.id === socket.id)
    if (userIndex !== -1) users.splice(userIndex, 1)
    updateUsers()
  })
})

module.exports = io
