const auth = require('../services/auth')

/**
 * Authenticates user:
 * - checks credentials
 * - generates jwt token
 * @module handlers/auth
 * @name authenticate
 * @async
 * @param {Object} ctx - context from koa
 * @returns {Promise}
 * @throws {Error}
 */
const authenticate = ctx => {
  const { email, password } = ctx.request.body
  return auth.authenticate(email, password)
    .then(token => {
      ctx.body = { token }
    })
}

module.exports = {
  authenticate
}
