const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const v1 = require('./api/v1')

const router = express.Router()

const secret = process.env.SECRET_KEY_JWT


// authen middleware
router.use((req, res, next) => {
  const token = req.get('x-access-token') || ''
  if (!token) return next()
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return next(err)

    const { username } = decoded || {}
    req.username = username
    return next()
  })
})

// REST api
router.use('/api/v1', v1)

// GET root
router.get('/', (req, res, next) => {
  res.json({ what: 'only api'})
})
//
// // GET home
// router.get('/home', (req, res, next) => {
//   const title = 'Home'
//   const username = req.username
//   res.render('home', { title, username })
// })
//
// // GET login
// router.get('/sign-in', (req, res, next) => {
//   const title = 'Login'
//   const username = req.username
//   if (username) return res.redirect('/home')
//   res.render('sign-in', { title, username })
// })
//
// // POST login
// router.post('/sign-in', (req, res, next) => {
//   const title = 'Login'
//   if (req.username) return res.redirect('/home')
//   const { username, password } = req.body
//
//   User.auth({ username, password }, (err, token) => {
//     if (err) return res.render('sign-in', { title, err })
//     res.cookie('token', token, { maxAge: 30*24*60*60*1000 })
//     res.redirect('/home')
//   })
// })
//
// // GET register
// router.get('/sign-up', (req, res, next) => {
//   const title = 'Create Account'
//   if (req.username) return res.redirect('/home')
//   res.render('sign-up', { title })
// })
//
// // POST register
// router.post('/sign-up', (req, res, next) => {
//   const title = 'Create Account'
//   if (req.username) return res.redirect('/home')
//
//   const { username, password, rePassword } = req.body
//   if (password !== rePassword) return res.render('sign-up', { title: 'Sign Up', err: 'Re-type password not match' })
//
//   User.addUser({ username, password }, (err, payload) => {
//     if (err) {
//       res.render('sign-up', { title, err })
//     } else {
//       res.cookie('token', payload.token, { maxAge: 30*24*60*60*100 })
//       res.redirect('/home')
//     }
//   })
// })
//
// // GET logout
// router.get('/sign-out', (req, res, next) => {
//   res.cookie('token', '', { maxAge: -1 })
//   res.redirect('/sign-in')
// })

module.exports = router
