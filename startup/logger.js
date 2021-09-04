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
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.timestamp(),
    winston.format.align()
    
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.Console()
  ],
  exceptionHandlers: [new winston.transports.File({ filename: 'exceptions.log' }), new winston.transports.Console()],

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
