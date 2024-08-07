const express = require('express')
const { logger, config } = require('./config')
const { registerRoutes } = require('./app')
const { errorHandler } = require('./middlewares/error')
const { database } = require('./database')
const httpStatus = require('http-status')
const { ApiError } = require('./shared')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

registerRoutes(app, { commonPath: '/api' })

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'URL path not found!'))
})

app.use(errorHandler)

const startServer = () =>
  app.listen(config.apiPort, () => {
    logger.info(`Http server listening at ${config.apiPort}`)
  })

database.connect().then(startServer)
