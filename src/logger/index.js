const winston = require('winston');

const logger = winston.createLogger({

    level: 'debug',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
      
        new winston.transports.Console()
    ]
  });

module.exports = logger;