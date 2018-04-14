const jwt = require('jsonwebtoken')
const { jwt: config } = require('../../config')

const sign = payload => jwt.sign(payload, config.secret, { expiresIn: config.expiration })

const verify = token => jwt.verify(token, config.secret)

module.exports = {
  sign,
  verify
}
