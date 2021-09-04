const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express')
const app = express()
const config = require('config')
const logger = require('./middleware/logger')
require('./startup/db')()
require('./startup/routes')(app)

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERRO: jwtPrivateKey is not defined')
  process.exit(1)
}

if (!config.get('MONGODB_URI')) {
  console.error('FATAL ERRO: MONGODB_URI is not defined')
  process.exit(1)
}

process
  .on('uncaughtException', (ex) => {
    logger.error(ex)
  })
  .on('unhandledRejection', (ex) => {
    logger.error(ex)
  })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
