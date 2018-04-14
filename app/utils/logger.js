const Bristol = require('bristol').Bristol
const palin = require('palin')
const { api: config } = require('../../config')

const logger = new Bristol()

logger.addTarget('console')
  .withLowestSeverity(config.logLevel)
  .withFormatter(palin)

module.exports = logger
