const Router = require('koa-router')
const validator = require('koa-async-validator')

// middlewares section
const logger = require('./middlewares/logger')
const error = require('./middlewares/error')

// handlers section
const hello = require('./handlers/hello')
const user = require('./handlers/user')

const router = new Router()

router.use(logger)
router.use(error)
router.use(validator())

router.get('/hello/:name', hello.sayHello)
router.get('/users', user.list)
router.post('/users', user.create)
router.put('/users/:id', user.update)
router.del('/users/:id', user.remove)

module.exports = router
