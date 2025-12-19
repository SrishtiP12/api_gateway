const rateLimit = require('express-rate-limit')

const limits = {
  go: 10,
  medium: 30,
  premium: 100
}

module.exports = (req, res, next) => {
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: limits[req.user.plan] || 5,
    message: 'Rate limit exceeded'
  })
  limiter(req, res, next)
}
