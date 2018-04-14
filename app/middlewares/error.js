const logger = require('../utils/logger')

module.exports = (ctx, next) => next()
  .catch(error => {
    logger.error(error)
    ctx.status = 500
    ctx.body = { error: error.message }
  })
