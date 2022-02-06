const router = require('express').Router()
const verified = require('./verifiToken')
const User = require('../model/User')

router.get('/', verified, async (req, res) => {
  // We have access to req.user (which is the id of a user) thanks to "verified"
  const user = await User.findOne({ _id: req.user._id })
  res.json({ favorites: user.favorites })
})

module.exports = router
