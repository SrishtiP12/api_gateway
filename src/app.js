const express = require('express')
const compression = require('compression')

const app = express()

app.use(compression())
app.use(express.json())
app.use(require('./middleware/requestLogger'))

app.use('/health', require('./routes/health.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/admin', require('./routes/admin.routes'))
app.use('/api', require('./routes/api.routes'))

app.use(require('./middleware/errorHandler'))

module.exports = app
