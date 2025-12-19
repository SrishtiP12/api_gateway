const router = require('express').Router()
const auth = require('../middleware/auth')
const rateLimiter = require('../middleware/rateLimiter')
const consumeCredits = require('../middleware/consumeCredits')
const weatherService = require('../services/weather.service')

// Apply auth and rate limiting to all API routes
router.use(auth)
router.use(rateLimiter)

router.get('/service1',
  consumeCredits('service1'),
  (req, res) => {
    res.json({ message: 'Service 1 response' })
  }
)

router.get('/service2',
  consumeCredits('service2'),
  (req, res) => {
    res.json({ message: 'Service 2 response' })
  }
)

router.get('/weather',
  consumeCredits('weather'),
  weatherService.weatherHandler
)

router.get('/clothing',
  consumeCredits('clothing'),
  require('../services/clothing.service')
)

router.get('/activity',
  consumeCredits('activity'),
  require('../services/activity.service')
)

module.exports = router
