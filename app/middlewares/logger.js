const logger = require('../utils/logger')

/**
 * Request logging middleware. Logs some pretty basic stuff.
 * @module middlewares/logger
 * @async
 * @param {Object} ctx context from koa
 * @param {function(): Promise} middleware continuation function
 * @returns {Promise}
 */
module.exports = (ctx, next) => {
  logger.debug(`Received Request: [${ctx.request.method}] ${ctx.request.url}`)
  return next()
}
