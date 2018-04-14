const { catalogue, ManagedError } = require('../utils/error')

module.exports = schema => (ctx, next) => {
  ctx.check(schema)
  return ctx.validationErrors()
    .then(error => error
      ? Promise.reject(new ManagedError(catalogue.INVALID_REQUEST))
      : next()
    )
}
