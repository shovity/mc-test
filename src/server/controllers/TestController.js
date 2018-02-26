const Test = require('../models/Test')
const Question = require('../models/Question')
const TestLog = require('../models/TestLog')

class TestControllers {
  static getTest(req, res, next) {
    const { id } = req.query
    const { username } = req

    Test.findById(id, (err, test) => {
      if (err) return res.json({ err: 'Test id not valid' })
      if (test === null) return res.json({ err: 'Test is removed' })

      TestLog.findOne({ test_id: test._id, username }, (err, testLog) => {
        const total = test.quests? test.quests.length : 0
        const title = test.title
        const time = test.time

        if (!testLog) {
          // first time, create test log
          const newTestLog = new TestLog({
            test_id: id,
            username
          })

          newTestLog.save((err) => {
            return res.json({ err, id, total, title, current: 0, time, timeLeft: time })
          })
        } else {
          // continue test
          const current = testLog.answers? testLog.answers.length : 0
          const timeLeft = (testLog.times.length===0)? time : time - testLog.times.reduce((a, b) => a+b, 0)

          if (current >= test.quests.length) return res.json({ isFinished: true })

          return res.json({
            id,
            title,
            current,
            total,
            time,
            timeLeft
          })
        }
      })
    })
  }

  static getTestStatus(req, res, next) {
    const username = req.username
    const test_id = req.query.id

    TestLog.findOne({ username, test_id }, (err, testLog) => {
      if (err) return res.json({ err })
      if (!testLog) return res.json({ status: { unmake: true } })

      // get test
      Test.findById(test_id, (err, test) => {
        if (err) return res.json({ err })
        if (!test) return res.json({ err: 'Test not fond' })

        let status = {}

        const quests = test.quests
        status.times = testLog.times
        status.answers = testLog.answers

        status.isFinished = status.answers.length === quests.length

        if (true || status.isFinished) {
          // calc points
          status.correct = 0
          status.answers.forEach((a, i) => {
            if (a.toLowerCase() === quests[i].true_answer.toLowerCase()) status.correct++
          })
        }

        return res.json({ status })
      })

    })
  }

  static postQuestion(req, res, next) {
    const { username } = req
    const { question } = req.body
    const onwer = username

    new Question({ ...question, onwer }).save((err, q) => {
      if (err) return res.json({ err })
      return res.json({ id: q._id, onwer })
    })
  }

  static getQuestion(req, res, next) {
    Question.find({}, (err, questions) => {
      if (err) return res.json({ err })
      return res.json({ questions })
    })
  }

  static postTest(req, res, next) {
    const { username, body } = req
    const test = new Test(body.test)
    test.save((err, test) => {
      if (err) return res.json({ err })
      return res.json({ test })
    })
  }

  //- end class
}

module.exports = TestControllers
