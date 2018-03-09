const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors')

// initial environment
if (process.env.NODE_ENV === 'production') {
  console.log('load environment for production')
  dotenv.config()
} else {
  console.log('load environment for development')
  dotenv.config({ path: path.join(__dirname, '../../.env.development') })
  console.log(process.env.MONGODB_CONNECT_URL)
}

const io = require('./io')
const api = require('./api')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3001

io.attach(server)

app.set('view engine', 'pug')
app.set('view cache', false)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// fake delay
// app.use((req, res, next) => {
//   setTimeout(() => {
//     next()
//   }, 500)
// })

app.use(api)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client')))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'))
  })
}

// 404
app.use((req, res, next) => {
  res.json({ err: '404 not found' })
})

server.listen(port)

server.on('listening', () => {
  console.log(`server multiple choice test is listening at http://127.0.0.1:${port}`)
})
