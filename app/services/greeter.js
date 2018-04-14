const sayHello = (name = 'World') => Promise.resolve(`Hello ${name}!`)

module.exports = {
  sayHello
}
