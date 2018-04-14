const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-bodyparser')
const appRouter = require('../app/routes')

const createServer = () => {
  const app = new Koa()
  const router = new Router()

  app.use(body())

  // Object.entries(versions).forEach(([version, versionRouter]) => router.use(`/${version}`, versionRouter.routes()))
  router.use(`/api/v1`, appRouter.routes())

  app.use(router.routes())

  return app
}

module.exports = createServer
