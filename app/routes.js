const Router = require('koa-router')
const validator = require('koa-async-validator')

// middlewares section
const logger = require('./middlewares/logger')
const error = require('./middlewares/error')

// handlers section
const hello = require('./handlers/hello')

const router = new Router()

router.use(logger)
router.use(error)
router.use(validator())

router.get('/hello/:name', hello.sayHello)

module.exports = router
