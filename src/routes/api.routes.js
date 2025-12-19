const router = require('express').Router()
const auth = require('../middleware/auth')
const consumeCredits = require('../middleware/consumeCredits')
const weatherService = require('../services/weather.service')

router.get('/service1',
  auth,
  consumeCredits('service1'),
  (req, res) => {
    res.json({ message: 'Service 1 response' })
  }
)

router.get('/service2',
  auth,
  consumeCredits('service2'),
  (req, res) => {
    res.json({ message: 'Service 2 response' })
  }
)

router.get('/weather',
  auth,
  consumeCredits('weather'),
  weatherService.weatherHandler
)

router.get('/clothing',
  auth,
  consumeCredits('clothing'),
  require('../services/clothing.service')
)

router.get('/activity',
  auth,
  consumeCredits('activity'),
  require('../services/activity.service')
)

module.exports = router
