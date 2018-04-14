const logger = require('../utils/logger')
const { response, catalogue } = require('../utils/error')

module.exports = (ctx, next) => next()
  .catch(error => {
    logger.error(error)
    const message = response[error.code] || response[catalogue.INTERNAL]
    ctx.status = message.status
    ctx.body = message.body
  })
