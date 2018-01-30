const express = require('express')
const Post = require('../../../models/Post')

const post = express.Router()

// POST
post.post('/', (req, res, next) => {
  const { content } = req.body;
  const { username } = req;

  const post = new Post({
    content,
    onwer: username
  })

  post.save((err, post) => {
    res.json({ err })
  })
})

module.exports = post
