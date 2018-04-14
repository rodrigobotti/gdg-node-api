const { catalogue, ManagedError } = require('../utils/error')

module.exports = (...roles) => (ctx, next) => {
  const { role } = ctx.state.user
  return (!role || !roles.some(r => r === role))
    ? Promise.reject(new ManagedError(catalogue.FORBIDDEN))
    : next()
}
