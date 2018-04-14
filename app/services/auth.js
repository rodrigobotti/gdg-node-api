const crypto = require('./crypto')
const userService = require('./user')
const jwt = require('./jwt')
const { catalogue, ManagedError } = require('../utils/error')

const verifyPassword = password => user => {
  const { hash, salt } = user
  const parameterHash = crypto.sha512(password, salt)
  const passwordCorrect = crypto.compare(hash, parameterHash)
  return passwordCorrect ? user : Promise.reject(new ManagedError(catalogue.UNAUTHENTICATED))
}

const authenticate = (email, password) => userService.findUserByEmail(email)
  .then(user => user || Promise.reject(new ManagedError(catalogue.NOT_FOUND)))
  .then(verifyPassword(password))
  .then(userService.displayableUser)
  .then(jwt.sign)

module.exports = {
  authenticate
}
