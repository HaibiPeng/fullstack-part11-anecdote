const app = require('./bloglist-backend/app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./bloglist-backend/utils/config')
const logger = require('.bloglist-backend/utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})