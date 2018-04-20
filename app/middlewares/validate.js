const { catalogue, ManagedError } = require('../utils/error')

/**
 * Creates request validation middleware that validates the request against the provided schema.
 *
 * @module middlewares/validate
 * @async
 * @param {Object} schema request definition schema
 * @returns {function(Object, Function): Promise} validation middlewares: uses koa-async-validator applying the schema to the context:
 * - verifies if the are validation errors in the context
 * - throws INVALID_REQUEST error if there are
 */
module.exports = schema => (ctx, next) => {
  ctx.check(schema)
  return ctx.validationErrors()
    .then(error => error
      ? Promise.reject(new ManagedError(catalogue.INVALID_REQUEST))
      : next()
    )
}
