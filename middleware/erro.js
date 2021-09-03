const logger = require('./logger')

module.exports = (err, req, res, next) => {
  console.error('ERROR =>', err)
  logger.error(err.message)
  res.status(500).send('Something failed.')
  next()
}
