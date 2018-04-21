const crypto = require('../../app/services/crypto')

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('user', [
    { email: 'admin@gdg-campinas.org', first_name: 'Admin', last_name: 'Admin', ...crypto.hashAndSalt('admin'), role: 'ADMIN' },
    { email: 'rodrigo.botti@gmail.com', first_name: 'Rodrigo', last_name: 'Botti', ...crypto.hashAndSalt('admin'), role: 'COMMON' }
  ], {}),

  down: (queryInterface, Sequelize) => {
  }
}
