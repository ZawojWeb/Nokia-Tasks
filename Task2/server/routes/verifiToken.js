const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).send('Access denied')

  try {
    // Return the id (which is hashed in the token)
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).send(error)
  }
}
