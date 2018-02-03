const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const cors = require('cors')

// initial environment
require('dotenv').config()

const io = require('./io')
const api = require('./api')

// open mongodb connect
const connect = require('./connect')

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

app.use(api)
app.use(express.static(path.join(__dirname, 'client')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

server.listen(port)

server.on('listening', () => {
  console.log(`server multiple choice test is listening at port http://127.0.0.1:${port}`)
})
