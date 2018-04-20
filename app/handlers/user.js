const service = require('../services/user')
const setTo = require('../utils/setTo')

const setToBody = setTo('body')

/**
 * Lists registered users
 * @module handlers/user
 * @name list
 * @async
 * @param {Object} ctx context from koa
 * @returns {Promise}
 */
const list = ctx => service.listAll()
  .then(result => ({ result }))
  .then(setToBody(ctx))

/**
 * Creates a user from request payload
 * @module handlers/user
 * @name create
 * @async
 * @param {Object} ctx context from koa
 * @returns {Promise}
 */
const create = ctx => service.create(ctx.request.body).then(setToBody(ctx))

/**
 * Updates user with /:id from request payload
 * @module handlers/user
 * @name update
 * @async
 * @param {Object} ctx context from koa
 * @returns {Promise}
 */
const update = ctx => service.updateWithId(ctx.params.id, ctx.request.body).then(setToBody(ctx))

/**
 * Deletes user with /:id
 * @module handlers/user
 * @name remove
 * @async
 * @param {Object} ctx context from koa
 * @returns {Promise}
 */
const remove = ctx => service.removeWithId(ctx.params.id).then(setToBody(ctx))

module.exports = {
  list,
  create,
  update,
  remove
}
