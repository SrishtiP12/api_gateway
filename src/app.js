const express = require('express')
const app = express()

app.use(express.json())

app.use('/auth', require('./routes/auth.routes'))
app.use('/admin', require('./routes/admin.routes'))
app.use('/api', require('./routes/api.routes'))

app.use(require('./middleware/errorHandler'))

module.exports = app
