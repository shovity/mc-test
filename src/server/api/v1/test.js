const express = require('express')
const TestControllers = require('../../controllers/TestController')

const test = express.Router()

test.get('/', TestControllers.getTest)
test.get('/status', TestControllers.getTestStatus)

module.exports = test
