const { env } = process
const path = require('path')
const dotenv = require('dotenv')

const DOTENV_ENVS = ['dev', 'test']

const loadDotEnv = (allowed, current) => {
  if (allowed.some(e => current.startsWith(e))) {
    dotenv.config({ silent: true })
  }
}

loadDotEnv(DOTENV_ENVS, env.npm_lifecycle_event)

module.exports = {
  api: {
    env: env.NODE_ENV,
    port: env.API_PORT,
    logLevel: env.LOG_LEVEL
  },
  database: {
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    storage: path.join(__dirname, '..', 'db', 'db.sqlite')
  }
}
