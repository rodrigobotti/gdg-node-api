const crypto = require('crypto')

/**
 * Creates a random salt hex string with length.
 *
 * @module services/crypto
 * @name createSalt
 * @param {number} length salt string length
 * @returns {string} random salt hex string
 */
const createSalt = length => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length)

/**
 * Hashes value with salt using the sha512 algorithm.
 *
 * @module services/crypto
 * @name sha512
 * @param {string} value value to hash
 * @param {string} salt random salt as hex string
 * @returns {string} hashed value as hex string
 * @throws {Error}
 */
const sha512 = (value, salt) => crypto.createHmac('sha512', salt).update(value).digest('hex')

/**
 * Creates a random salt of length 16 and sha512 the value with it.
 *
 * @module services/crypto
 * @name hashAndSalt
 * @param {string} value value to hash
 * @returns {string} hashed value
 */
const hashAndSalt = value => {
  const salt = createSalt(16)
  const hash = sha512(value, salt)
  return { salt, hash }
}

/**
 * Time safely compares two strings.
 *
 * @module services/crypto
 * @name compare
 * @async
 * @param {string} a string to compare
 * @param {string} b string to compare
 * @returns {boolean} whether or not the two strings are equal
 */
const compare = (a, b) => crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b))

module.exports = {
  createSalt,
  sha512,
  hashAndSalt,
  compare
}
