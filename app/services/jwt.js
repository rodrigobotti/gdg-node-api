const jwt = require('jsonwebtoken')
const { jwt: config } = require('../../config')

/**
 * Creates a signed jwt.
 *
 * @module services/jwt
 * @name sign
 * @param {Object} payload pyaload to tokenize
 * @returns {string} jwt
 */
const sign = payload => jwt.sign(payload, config.secret, { expiresIn: config.expiration })

/**
 * Decodes the jwt.
 *
 * @module services/jwt
 * @name verify
 * @param {string} token signed jwt
 * @returns {Object} decoded token payload
 */
const verify = token => jwt.verify(token, config.secret)

module.exports = {
  sign,
  verify
}
