const service = require('../services/user')
const setTo = require('../utils/setTo')

const setToBody = setTo('body')

const list = ctx => service.listAll()
  .then(result => ({ result }))
  .then(setToBody(ctx))

const create = ctx => service.create(ctx.request.body).then(setToBody(ctx))

const update = ctx => service.updateWithId(ctx.params.id, ctx.request.body).then(setToBody(ctx))

const remove = ctx => service.removeWithId(ctx.params.id).then(setToBody(ctx))

module.exports = {
  list,
  create,
  update,
  remove
}
