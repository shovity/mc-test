const express = require('express')
const path = require('path')
const upload = require('../../upload')
const crypto = require('crypto')
const fs = require('fs')

const User = require('../../models/User')

const UPLOAD_PATH = path.join(__dirname, '../../uploads')

const avatar = express.Router()


// PUT
avatar.put('/', upload.single('avatar'), (req, res, next) => {
  const path = req.pathAvatarUploaded
  if (req.err) return res.json('You must login before upload')

  if (!path) return res.json( { err: 'upload avatar error' })

  return res.json({
    message: 'upload file completed',
    path,
  })
})

// GET username
avatar.get('/:username', (req, res, next) => {
  const username = req.params.username
  const avatarName = `avatar-${crypto.createHash('md5').update(username).digest('hex')}`
  const avatarNameGuest = `avatar-${crypto.createHash('md5').update('guest').digest('hex')}`
  const avatarUri = path.join(UPLOAD_PATH, avatarName)
  const avatarUriGuest = path.join(UPLOAD_PATH, avatarNameGuest)

  User.findOne({ username }, (err, user) => {
    if (err || !user || !user.avatar_image) {
      return fs.readFile(avatarUri, (err, data) => {
        if (err && err.code === 'ENOENT') {
          return fs.readFile(avatarUriGuest, (err, data) => {
            if (err) return res.json({ err })
            return res.end(data)
          })
        }

        if (err) return res.json({ err })
        return res.end(data)
      })
    } else {
      return res.redirect(user.avatar_image)
    }
  })
})

module.exports = avatar
