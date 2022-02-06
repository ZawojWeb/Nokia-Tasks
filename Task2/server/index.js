const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')

app.use(cors())
dotenv.config()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

// Import routers
const authRouter = require('./routes/auth')
const dashboard = require('./routes/dashboard')
const favorite = require('./routes/favorite')

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('Connect to MongoDB')
})

// Middlewares
app.use(express.json())

// Routers middlewares
app.use('/api/user', authRouter)
app.use('/api/dashboard', dashboard)
app.use('/api/favorite', favorite)

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
