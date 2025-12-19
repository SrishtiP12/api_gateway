const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const plans = require('../config/plans')
const auth = require('../middleware/auth')
const role = require('../middleware/role')

router.post('/create-user', auth, role('admin'), async (req, res) => {
  const { email, password, plan } = req.body

  if (!plans[plan]) {
    return res.status(400).json({ message: 'Invalid plan' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    email,
    password: hashedPassword,
    plan,
    credits: plans[plan].totalCredits
  })

  res.status(201).json({
    message: 'User created',
    user: {
      email: user.email,
      plan: user.plan,
      credits: user.credits
    }
  })
})

module.exports = router
