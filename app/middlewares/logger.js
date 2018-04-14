const logger = require('../utils/logger')

module.exports = (ctx, next) => {
  logger.debug(`Received Request: [${ctx.request.method}] ${ctx.request.url}`)
  return next()
}
