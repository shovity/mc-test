const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, 'uploads'))
  },
  filename: (req, file, callback) => {
    console.log('catch upload file')
    const username = req.username
    const fieldname = file.fieldname
    if (!username) {
      req.err = 'You must login before upload'
      return
    }

    const hash = crypto.createHash('md5').update(username).digest('hex')
    const name = `${fieldname}-${hash}`
    req.pathAvatarUploaded = name
    callback(null, name)
  }
})

const upload = multer({
  storage
})

module.exports = upload
