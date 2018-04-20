const { catalogue, ManagedError } = require('../utils/error')

/**
 * Creates authorization middleware that authorizes the roles passed as parameters.
 *
 * @module middlewares/authorization
 * @param {Array<String>} roles roles authorized
 * @returns {function(Object, Function): Promise} Authorization middleware:
 * - if not authorized: interrupts middleware stack with FORBIDDEN error
 * - continues middleware stack otherwise
 */
module.exports = (...roles) => (ctx, next) => {
  const { role } = ctx.state.user
  return (!role || !roles.some(r => r === role))
    ? Promise.reject(new ManagedError(catalogue.FORBIDDEN))
    : next()
}
