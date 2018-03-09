const socket = require('socket.io')
const jwt = require('jsonwebtoken')

const ChatHistory = require('./models/ChatHistory')
const Test = require('./models/Test')
const TestLog = require('./models/TestLog')

const secret = process.env.SECRET_KEY_JWT
const io = socket()

// { socketId: string, username: string, status: string }
let members = []
let total = 0

// emit update event to all client
const updateUsers = () => {
  io.emit('update users', { members, total })
}

// when user pass a question, disconnect
const passQuestion = id => {
  // TestLog.findByIdAndUpdate(
  //   id,
  //   {
  //     $set: { modifined_date: Math.floor(Date.now()) },
  //     $push: { answers: "", times: 0 },
  //   },
  //   (err) => { if (err) console.log('Can not update test log') }
  // )
}

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

  /**
   * LOGIN
   */
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

  /**
   * LOGOUT
   */
  socket.listen('logout', data => {
    const memberIndex = members.findIndex(user => user.username === data.username)
    if (memberIndex !== -1) {
      console.log(`${data.username}(${socket.id}) logout`)
      members.splice(memberIndex, 1)

      // if exist test session, end session
      socket.testLogId && passQuestion(socket.testLogId)
    } else {
      console.log('logout not match any exist user in members')
    }
    updateUsers()
  })

  /**
   * DISCONNECT
   * disconnect don't need middleware
   */
  socket.on('disconnect', () => {
    total--
    const memberIndex = members.findIndex(user => user.socketId === socket.id)
    if (memberIndex !== -1) {
      console.log(`${members[memberIndex].username}(${socket.id}) disconnect`)
      members.splice(memberIndex, 1)

      // if exist test session, end session
      socket.testLogId && passQuestion(socket.testLogId)
    } else {
      console.log('Guest disconnect')
    }
    updateUsers()
  })

  /**
   * SEND MESSAGE
   */
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
              modifined_date: Date.now(),
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

  /**
   * FETCH QUESTIONS
   */
  socket.listen('fetch question', (data) => {
    const { id, username } = data

    Test.findById(id, (err, test) => {
      if (err) return socket.emit('err', 'Test id not valid')
      if (test === null) return socket.emit('err', 'Test is removed')

      const time = test.time

      TestLog.findOne({ test_id: test._id, username }, (err, testLog) => {
        if (err) return socket.emit('err', err)
        if (!testLog) return socket.emit('err', 'Test log not found')

        const current = testLog.answers? testLog.answers.length : 0
        if (current >= test.quests.length) return socket.emit('test finished')

        const quest = test.quests[current]
        const timeLeft = (testLog.times.length===0)? time : time - testLog.times.reduce((a, b) => a+b, 0)

        // set start time, session
        socket.startTime = Math.floor(Date.now()/1000)
        socket.testLogId = testLog._id
        return socket.emit('fetch question', { quest,  current, timeLeft })
      })
    })
  })

  /**
   * SEND QUESTIONS
   */
  socket.listen('send question', (data) => {
    const { username, answer, id, current } = data
    TestLog.findOneAndUpdate(
      { username, test_id: id },
      {
        $set: { modifined_date: Math.floor(Date.now(0)) },
        $push: { answers: answer, times: Math.floor(Date.now()/1000 - socket.startTime) }
      },
      (err) => {
        if (err) return socket.emit('err', 'Can not update test log')
      }
    )
  })

  //-- END CONECTION
})

module.exports = io
