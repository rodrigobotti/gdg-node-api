const winston = require('winston')
const config = require('../../config')

const logger = winston.createLogger({
  level: config.api.logLevel,
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger
