const auth = require('../services/auth')

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
