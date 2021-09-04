const mongoose = require('mongoose')
const config = require('config')
const logger = require('../middleware/logger')

module.exports = async () => {
  mongoose.set('debug', true)

  mongoose
    .connect(config.get('MONGODB_URI'), { useNewUrlParser: true })
    .then(() => logger.info('Connected to mongo...'))
    .catch((err) => logger.error(`err=> ${err}`))
}
