const rateLimit = require('express-rate-limit')
const plans = require('../config/plans')

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  keyGenerator: (req) => {
    // limit by user id if authenticated, otherwise by ip
    return req.user ? req.user.id : req.ip
  },
  max: (req) => {
    // If user is authenticated and has a plan, use that plan's limit
    if (req.user && req.user.plan && plans[req.user.plan]) {
      return plans[req.user.plan].rateLimit || 5
    }
    return 5 // Default strict limit for unauthenticated or unknown plans
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too Many Requests',
      message: req.user
        ? `Rate limit exceeded for your ${req.user.plan} plan`
        : 'Rate limit exceeded'
    })
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  validate: {
    trustProxy: false,
    ip: false,
    keyGeneratorIpFallback: false
  }
})

module.exports = limiter
