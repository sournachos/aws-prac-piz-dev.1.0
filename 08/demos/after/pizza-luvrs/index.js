const Hapi = require('@hapi/hapi')
const { logger } = require('./util/logger')

const plugins = require('./util/plugins')
const routes = require('./routes')

async function startServer () {
  const server = Hapi.Server({
    port: 3000,
    cache: [
      {
        name: 'redis',
        provider: {
          constructor: require('@hapi/catbox-redis'),
          options: {
            partition: 'cache',
            host: 'pizza-cluster.awsz6d.0001.use2.cache.amazonaws.com'
          }
        }
      }
    ]
  })

  await plugins.register(server, logger)
  routes.register(server)

  try {
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.error(`Server could not start. Error: ${err}`)
    logger.error(`Server could not start. Error: ${err}`)
  }
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Reason: ${reason.message}, Stack: ${reason?.stack}`)
  logger.error(`Reason: ${reason.message}, Stack: ${reason?.stack}`)
  process.exit()
})

startServer()
