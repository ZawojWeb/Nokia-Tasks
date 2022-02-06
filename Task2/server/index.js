const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  next()
})

// Import routers
const authRouter = require('./routes/auth')
const dashboard = require('./routes/dashboard')

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connect to MongoDB')
})

// Middlewares
app.use(express.json())

// Routers middlewares
app.use('/api/user', authRouter)
app.use('/api/dashboard', dashboard)

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
