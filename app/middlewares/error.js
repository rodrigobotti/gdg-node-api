const logger = require('../utils/logger')
const { response, catalogue } = require('../utils/error')

/**
 * Error handling middleware.
 * Should be mounted at the top of the application router.
 *
 * @module middlewares/error
 * @async
 * @param {Object} ctx context from koa
 * @param {function(): Promise} next middlware continuation function
 * @returns {Promise}
 */
module.exports = (ctx, next) => next()
  .catch(error => {
    logger.error(error)
    const message = response[error.code] || response[catalogue.INTERNAL]
    ctx.status = message.status
    ctx.body = message.body
  })
