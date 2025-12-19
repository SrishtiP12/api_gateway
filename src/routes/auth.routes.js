const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const rateLimiter = require('../middleware/rateLimiter')

router.use(rateLimiter)

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(404).json({ message: 'User not found' })

  const valid = await bcrypt.compare(req.body.password, user.password)
  if (!valid) return res.status(401).json({ message: 'Invalid password' })

  const token = jwt.sign(
    { id: user._id, role: user.role, plan: user.plan },
    process.env.JWT_SECRET
  )

  res.json({ token })
})

module.exports = router
