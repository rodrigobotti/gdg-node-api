const greeter = require('../services/greeter')

const sayHello = ctx => greeter.sayHello(ctx.params.name)
  .then(hello => {
    ctx.body = { hello }
  })

module.exports = {
  sayHello
}
