const router = require('express').Router()
const User = require('../model/User')
const { loginValidation, registerValidation } = require('../validation')

router.post('/register', async (req, res) => {
  // VALIDATION data
  const error = registerValidation(req.body)
  console.log(error.error)
  if (error.error) return res.status(400).send(error.error.details[0].message)

  // Check if the user already exist in db
  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) return res.status(400).send('Email already exists!')

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router
