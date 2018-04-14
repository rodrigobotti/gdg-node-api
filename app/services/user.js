const { pick, map, mergeAll } = require('ramda')
const User = require('../models/user')
const crypto = require('./crypto')

const FIELDS_DISPLAYABLE = ['id', 'email', 'first_name', 'last_name', 'role']
const FIELDS_UPDATABLE = ['email', 'first_name', 'last_name', 'role', 'hash', 'salt']

const displayableUser = pick(FIELDS_DISPLAYABLE)
const updatableUser = pick(FIELDS_UPDATABLE)

const listAll = email => User.findAll()
  .then(map(displayableUser))

const create = ({ password, ...infos }) =>
  User.create({
    ...displayableUser(infos),
    ...crypto.hashAndSalt(password)
  })
    .then(displayableUser)

const updateWithId = (id, { password, ...infos }) => User.findById(id)
  .then(user => user.update(mergeAll([ updatableUser(user), crypto.hashAndSalt(password), infos ]), { fields: FIELDS_UPDATABLE }))
  .then(displayableUser)

const removeWithId = id => User.destroy({ where: { id } }).then(() => ({ id }))

const findUserByEmail = email => User.findOne({ where: { email } })

module.exports = {
  listAll,
  removeWithId,
  create,
  updateWithId,
  findUserByEmail,
  displayableUser
}
