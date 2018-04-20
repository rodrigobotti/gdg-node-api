const jwt = require('../services/jwt')
const { catalogue, ManagedError } = require('../utils/error')
const logger = require('../utils/logger')

/**
 * Authentication middleware:
 * - attempts to decode jwt token in 'Authorization' header.
 * - set decoded user in ctx.state.user
 * - continues middleware stack
 *
 * @module middlewares/auth
 * @async
 * @param {Object} ctx context from koa
 * @param {function(): Promise} next middleware continuation function
 * @returns {Promise}
 * @throws {Error} UNAUTHENTICATED
 */
module.exports = (ctx, next) => {
  try {
    const token = ctx.headers.authorization.replace('Bearer ', '')
    ctx.state.user = jwt.verify(token)
    ctx.state.token = token
  } catch (err) {
    logger.error(err)
    return Promise.reject(new ManagedError(catalogue.UNAUTHENTICATED))
  }
  return next()
}
