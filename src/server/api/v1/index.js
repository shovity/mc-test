const express = require('express')

const user = require('./user')
const auth = require('./auth')
const post = require('./post')
const chatHistory = require('./chatHistory')
const test = require('./test')
const testDetail = require('./testDetail')
const avatar = require('./avatar')
const history = require('./history')
const notifications = require('./notifications')

const TestControllers = require('../../controllers/TestController')

const rootController = {
  TestControllers
}

const v1 = express.Router()

// REST api
v1.use('/user', user)
v1.use('/auth', auth)
v1.use('/post', post)
v1.use('/chat-history', chatHistory)
v1.use('/avatar', avatar)
v1.use('/history', history)
v1.use('/test-detail', testDetail)
v1.use('/notifications', notifications)

const applyAPI = (base, api) => {
  Object.keys(api).forEach(key => {
    const [ method, path ] = key.split(' ')
    const [ controller, handle ] = test[key].split('.')
    v1[method](base + path, rootController[controller][handle])
  })
}

applyAPI('/test', test)

module.exports = v1
