const { cpus } = require('os')
const cluster = require('cluster')
const createServer = require('./server')
const { api: config } = require('../config')
const logger = require('../app/utils/logger')

const startServer = () => createServer().listen(config.port)

const masterCluster = () => {
  const workers = cpus().length
  for (let i = 0; i < workers; i++) {
    cluster.fork()
  }
  cluster.on('online', worker => logger.debug(`Worker ${worker.process.pid} is online`))
  cluster.on('exit', (worker, code, signal) => {
    logger.error(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`)
    logger.debug('Starting new worker')
    cluster.fork()
  })
}

const startCluster = () => {
  if (cluster.isMaster) {
    masterCluster()
  } else {
    startServer()
  }
}

const startApplication = clustering => clustering ? startCluster() : startServer()

startApplication(config.clustering)
