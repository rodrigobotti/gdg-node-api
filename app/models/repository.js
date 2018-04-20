const Sequelize = require('sequelize')
const { database: config } = require('../../config')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

/**
 * @module models/repository
 */
module.exports = {
  /**
   * Configured Sequelize instance with access to the database (i.e. the atual repository instance)
   * @name sequelize
   */
  sequelize,
  /**
   * Sequelize static import
   * @name Sequelize
   */
  Sequelize
}
