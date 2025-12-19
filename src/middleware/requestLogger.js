const logger = require('../config/logger')

const requestLogger = (req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
        const duration = Date.now() - start
        const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`

        if (res.statusCode >= 400) {
            logger.error(message, {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                duration,
                body: req.body // Be careful with sensitive data here in prod
            })
        } else {
            logger.info(message, {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                duration
            })
        }
    })

    next()
}

module.exports = requestLogger
