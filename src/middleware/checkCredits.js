const User = require('../models/User')

module.exports = async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user || user.credits <= 0) {
    return res.status(403).json({
      message: 'No credits left. Please upgrade your plan.'
    })
  }

  // Deduct 1 credit per request (simple for now)
  user.credits -= 1
  await user.save()

  next()
}
