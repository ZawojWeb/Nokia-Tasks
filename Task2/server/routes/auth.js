const router = require('express').Router()
const bcrypt = require('bcryptjs/dist/bcrypt')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const verified = require('./verifiToken')
const { loginValidation, registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // VALIDATION data
  const error = registerValidation(req.body)
  if (error.error) return res.status(400).send(error.error.details[0].message)

  // Check if the user already exist in db
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists!')

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  })
  try {
    const savedUser = await user.save()
    const jwtToken = jwt.sign({ _id: savedUser.id }, process.env.TOKEN_SECRET)
    return res.json({ jwtToken })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  // VALIDATION data
  const error = loginValidation(req.body)
  if (error.error) return res.status(400).send(error.error.details[0].message)

  // Check if the user exist in db
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email or password is wrong!')

  // Check the password is correct
  const vaildPassword = await bcrypt.compare(req.body.password, user.password)
  if (!vaildPassword) return res.status(400).send('Email or password is wrong! Please try again.')

  // Create a token
  const jwtToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  return res.json({ jwtToken })
})

router.post('/verify', verified, (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
