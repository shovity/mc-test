const express = require('express')

const user = require('./user')
const auth = require('./auth')
const post = require('./post')
const chatHistory = require('./chatHistory')
const test = require('./test')
const avatar = require('./avatar')
const TestControllers = require('../../controllers/TestController')

const rootController = {
  TestControllers
}

const v1 = express.Router()

// REST api
v1.use('/user', user)
v1.use('/auth', auth)
v1.use('/post', post)
v1.use('/chatHistory', chatHistory)
v1.use('/avatar', avatar)

const applyAPI = (base, api) => {
  Object.keys(api).forEach(key => {
    const [ method, path ] = key.split(' ')
    const [ controller, handle ] = test[key].split('.')
    v1[method](base + path, rootController[controller][handle])
  })
}

applyAPI('/test', test)

module.exports = v1
