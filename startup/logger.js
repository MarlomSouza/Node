const winston = require('winston')

process
  .on('uncaughtException', (ex) => {
    logger.error(ex)
  })
  .on('unhandledRejection', (ex) => {
    logger.error(ex)
  })

// winston.exceptions.handle(new winston.transports.File({ filename: 'exceptions.log' }))

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' })
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' })],

  exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}

module.exports = logger
