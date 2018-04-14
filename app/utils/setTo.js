const { curry } = require('ramda')

module.exports = curry((field, target, data) => {
  target[field] = data
})
