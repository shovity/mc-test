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

// PUT
post.put('/', (req, res, next) => {
  const { content, id } = req.body;
  const { username } = req;

  Post.findById(id, (err, post) => {
    if (err) return res.json({ err: 'post not found' })

    Post.findByIdAndUpdate(
      id,
      { $set: { comments: post.comments.concat({ username, content }) } },
      (err) => {
        res.json({ err, id, comment: { content, username } })
      }
    )
  })
})

// GET
post.get('/', (req, res, next) => {
  Post.find({}).sort({ createdDate: 'desc' }).exec((err, posts) => {
    res.json({ err, posts })
  })
})

module.exports = post
