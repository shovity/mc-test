const express = require('express')

const TestLog = require('../../models/TestLog')

const history = express.Router()

history.get('/', (req, res, next) => {
  const { username, query } = req
  const { limit, offset } = query

  TestLog.aggregate(
    [
      {
        $lookup: {
          from: "tests",
          localField: "test_id",
          foreignField: "_id",
          as: "test",
        }
      },
      {
        $project: {
          created_date: 1,
          modified_date: 1,
          answers: 1,
          // times: 1,
          test: {
            $arrayElemAt: [ "$test", 0 ]
          }
        }
      }
    ],
    (err, testLogs) => {
      if (err) return res.json({ err })
      return res.json({ testLogs })
    }
  )

})

module.exports = history
