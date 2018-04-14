const dotenv = require('dotenv')

if (process.env.npm_lifecycle_event.startsWith('dev') ||
process.env.npm_lifecycle_event.startsWith('test') ||
process.env.npm_lifecycle_event.startsWith('sequelize')) {
  dotenv.config({ silent: true })
}

module.exports = {
  api: {
    env: process.env.NODE_ENV,
    port: process.env.API_PORT,
    logLevel: process.env.LOG_LEVEL
  },
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: ':memory:'
  }
}
