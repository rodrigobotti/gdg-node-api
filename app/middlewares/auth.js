const jwt = require('../services/jwt')
const { catalogue, ManagedError } = require('../utils/error')
const logger = require('../utils/logger')

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
