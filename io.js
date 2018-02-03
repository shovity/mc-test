const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const ChatHistory = require('./models/ChatHistory')

const secret = process.env.SECRET_KEY_JWT
const io = socket()

// { socketId: string, username: string, status: string }
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

  // listen with middleware
  socket.listen = (eventName, callback) => {
    socket.on(eventName, (data) => {
      // middleware

      jwt.verify(data.token, secret, (err, decoded) => {
        if (err) return socket.emit('err', err)
        const extend = { username: decoded.username }
        callback({ ...data, ...extend })
      })
    })
  }

  // LISTENER

  socket.listen('login', data => {
    const username = data.username
    const user = members.find(user => user.username === username)

    if (!user) {
      console.log(`${data.username}(${socket.id}) new login`)
      members.push({
        username: username,
        socketId: socket.id,
        status: 'online'
      })
    } else {
      console.log(`${data.username}(${socket.id}) remaping id`)
      user.id = socket.id
    }

    updateUsers()
  })

  socket.listen('logout', data => {
    const memberIndex = members.findIndex(user => user.username === data.username)
    if (memberIndex !== -1) {
      console.log(`${data.username}(${socket.id}) logout`)
      members.splice(memberIndex, 1)
    } else {
      console.log('logout not match any exist user in members')
    }
    updateUsers()
  })

  // disconnect don't need middleware
  socket.on('disconnect', () => {
    total--
    const memberIndex = members.findIndex(user => user.socketId === socket.id)
    if (memberIndex !== -1) {
      console.log(`${members[memberIndex].username}(${socket.id}) disconnect`)
      members.splice(memberIndex, 1)
    } else {
      console.log('Guest disconnect')
    }
    updateUsers()
  })

  // send chat message event
  socket.listen('send message', (data) => {
    const { target, message, username } = data
    const userx = [username, target]

    ChatHistory.findOne({ userx: { $all: userx } }, (err, data) => {
      if (err) return socket.emit('err', err)

      if (!data) {
        // history exists
        if (err) return socket.emit('err', 'chat history not found. userx=' + userx)
      } else {
        const t = members.find(m => m.username === target)
        const unread = target

        ChatHistory.findOneAndUpdate(
          { userx: { $all: userx } },
          {
            $set: {
              modified_date: Date.now(),
              unread,
              messages: data.messages.concat({ sender: username, content: message })
            }
          },
          (err) => {
            // send message back
            socket.emit('send message', {
              err,
              message: { sender: username, content: message },
              userx
            })

            // if target is online, send realtime to it
            if (t) {
              socket.broadcast.to(t.socketId).emit('send message', {
                message: { sender: username, content: message },
                userx
              })
            }
          }
        )
      }
    })
  })
})

module.exports = io
