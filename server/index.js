const createServer = require('./server')
const config = require('../config')

const app = createServer()
app.listen(config.api.port)
