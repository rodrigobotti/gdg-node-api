const crypto = require('crypto')

const createSalt = length => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length)

const sha512 = (value, salt) => crypto.createHmac('sha512', salt).update(value).digest('hex')

const hashAndSalt = value => {
  const salt = createSalt(16)
  const hash = sha512(value, salt)
  return { salt, hash }
}

module.exports = {
  createSalt,
  sha512,
  hashAndSalt
}
