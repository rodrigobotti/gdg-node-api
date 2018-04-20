const { pick, map, mergeAll } = require('ramda')
const User = require('../models/user')
const crypto = require('./crypto')

const FIELDS_DISPLAYABLE = ['id', 'email', 'first_name', 'last_name', 'role']
const FIELDS_UPDATABLE = ['email', 'first_name', 'last_name', 'role', 'hash', 'salt']

const displayableUser = pick(FIELDS_DISPLAYABLE)
const updatableUser = pick(FIELDS_UPDATABLE)

/**
 * Displayable user information
 * @typedef {{id:number,email:string,first_name:string,last_name:string,role:string}} DisplayableUser
 */

/**
 * Updatable user fields
 * @typedef {{id:number,email:string,first_name:string,last_name:string,role:string,password:string}} UpdatableUser
 */

/**
 * Lists all users in the database.
 *
 * @module services/user
 * @name listAll
 * @async
 * @returns {Promise<Array<DisplayableUser>>} list of users
 */
const listAll = () => User.findAll().then(map(displayableUser))

/**
 * Inserts user in the database.
 *
 * @module services/user
 * @name create
 * @async
 * @param {UpdatableUser} user user dto with information to be inserted
 * @returns {Promise<DisplayableUser>} created user
 */
const create = ({ password, ...infos }) => User.create({
  ...displayableUser(infos),
  ...crypto.hashAndSalt(password)
})
  .then(displayableUser)

/**
 * Updates user with matching id.
 *
 * @module services/user
 * @name updateWithId
 * @async
 * @param {number} id user id
 * @param {UpdatableUser} fields fields to update
 * @returns {Promise<DisplayableUser>} updated user
 */
const updateWithId = (id, { password, ...infos }) => User.findById(id)
  .then(user => user.update(mergeAll([ updatableUser(user), crypto.hashAndSalt(password), infos ]), { fields: FIELDS_UPDATABLE }))
  .then(displayableUser)

/**
 * Deletes user with matching id.
 * @module services/user
 * @name removeWithId
 * @async
 * @param {number} id user id
 * @returns {Promise<{id:number}>} id of deleted user
 */
const removeWithId = id => User.destroy({ where: { id } }).then(() => ({ id }))

/**
 * Finds user with matching email.
 *
 * @module services/user
 * @name findUserByEmail
 * @async
 * @param {string} email user email
 * @returns {Promise<sequelize.Model>} user
 */
const findUserByEmail = email => User.findOne({ where: { email } })

module.exports = {
  listAll,
  removeWithId,
  create,
  updateWithId,
  findUserByEmail,
  displayableUser
}
