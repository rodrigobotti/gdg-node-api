const Router = require('koa-router')
const validator = require('koa-async-validator')

// middlewares section
const logger = require('./middlewares/logger')
const error = require('./middlewares/error')
const authenticated = require('./middlewares/auth')
const validate = require('./middlewares/validate')
const schemas = require('./utils/schemas')
const authorize = require('./middlewares/authorization')

// handlers section
const hello = require('./handlers/hello')
const user = require('./handlers/user')
const auth = require('./handlers/auth')

const router = new Router()

router.use(logger)
router.use(error)
router.use(validator())

router.get('/hello/:name', hello.sayHello)

router.get('/users', authenticated, user.list)
router.post('/users', authenticated, authorize('ADMIN'), validate(schemas.userCreate), user.create)
router.put('/users/:id', authenticated, authorize('ADMIN'), validate(schemas.userUpdate), user.update)
router.del('/users/:id', authenticated, authorize('ADMIN'), validate(schemas.userRemove), user.remove)

router.post('/login', validate(schemas.authenticate), auth.authenticate)

module.exports = router
