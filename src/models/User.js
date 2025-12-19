const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },

  plan: {
    type: String,
    enum: ['go', 'medium', 'premium'],
    required: true
  },

  credits: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
