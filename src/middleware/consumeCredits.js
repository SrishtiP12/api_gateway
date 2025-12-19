const User = require('../models/User')
const plans = require('../config/plans')

const consumeCredits = (apiName) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const planConfig = plans[user.plan]
    const cost = planConfig.apiCost[apiName]

    if (user.credits < cost) {
      return res.status(403).json({
        message: 'Insufficient credits. Please upgrade plan.'
      })
    }

    user.credits -= cost
    await user.save()

    next()
  }
}

module.exports = consumeCredits
