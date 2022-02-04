const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()

dotenv.config()

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
