const express = require('express')

const TestLog = require('../../models/TestLog')
const Test = require('../../models/Test')

const testDetail = express.Router()

testDetail.get('/', (req, res, next) => {
  const { username, query } = req
  const { id } = query

  Test.findOne({ _id: id }, (err, test) => {
    if (err) return res.json({ err })

    TestLog.findOne({ test_id: id, username }, (err, testLog) => {
      if (err) return res.json({ err })

      const testStatus = {}
      if (testLog) {
        testStatus.times = testLog.times
        testStatus.answers = testLog.answers

        testStatus.isFinished = testStatus.answers.length === test.quests.length

        if (true || testStatus.isFinished) {
          const current = testLog.answers? testLog.answers.length : 0
          testStatus.timeLeft = (testLog.times.length===0)
            ? test.time
            : test.time - testLog.times.reduce((a, b) => a+b, 0)
          // calc points
          testStatus.correct = 0
          testStatus.answers.forEach((a, i) => {
            if (a.toLowerCase() === test.quests[i].true_answer.toLowerCase()) testStatus.correct++
          })
        }
      }

      return res.json({ test, testLog, testStatus })
    })
  })
})

module.exports = testDetail
