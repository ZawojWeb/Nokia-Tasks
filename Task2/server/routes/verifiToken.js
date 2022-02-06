const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.header('jwtToken')
  if (!token) return res.status(401).send('Access denied')

  try {
    // Return the id (which is hashed in the token)
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    console.log(verified)
    next()
  } catch (error) {
    return res.status(401).json('Not authorized')
  }
}
