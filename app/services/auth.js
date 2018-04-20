const crypto = require('./crypto')
const userService = require('./user')
const jwt = require('./jwt')
const { catalogue, ManagedError } = require('../utils/error')

const verifyPassword = password => user => {
  const { hash, salt } = user
  const parameterHash = crypto.sha512(password, salt)
  const passwordCorrect = crypto.compare(hash, parameterHash)
  return passwordCorrect ? user : Promise.reject(new ManagedError(catalogue.INVALID_CREDENTIALS))
}

/**
 * Authenticates the user:
 * - checks user existence (by email)
 * - checks password against database
 * - generates jwt token
 *
 * @module services/auth
 * @name authenticate
 * @async
 * @param {string} email user email
 * @param {string} password user password
 * @returns {Promise<string>} jwt token
 * @throws {Error} INVALID_CREDENTIALS
 */
const authenticate = (email, password) => userService.findUserByEmail(email)
  .then(user => user || Promise.reject(new ManagedError(catalogue.INVALID_CREDENTIALS)))
  .then(verifyPassword(password))
  .then(userService.displayableUser)
  .then(jwt.sign)

module.exports = {
  authenticate
}
