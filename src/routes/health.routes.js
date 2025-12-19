const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    const dbState = mongoose.connection.readyState
    const dbStatus = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    }

    const health = {
        status: 'UP',
        timestamp: new Date(),
        uptime: process.uptime(),
        database: {
            status: dbStatus[dbState] || 'unknown',
            readyState: dbState
        }
    }

    // If DB is disconnected, you might want to return 503 Service Unavailable
    if (dbState === 0 || dbState === 3) {
        health.status = 'DOWN'
        return res.status(503).json(health)
    }

    res.json(health)
})

module.exports = router
