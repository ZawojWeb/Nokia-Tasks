const router = require('express').Router()
const verified = require('./verifiToken')
const User = require('../model/User')

router.get('/', verified, async (req, res) => {
  // We have access to req.user (which is the id of a user) thanks to "verified"
  const user = await User.findOne({ id: req.user })
  res.json({ username: user.name, email: user.email, favorites: user.favorites })
})

module.exports = router
