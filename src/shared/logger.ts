import winston from 'winston'
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
// import chalk from 'chalk'

const { combine, timestamp, printf } = winston.format

const myFormat = printf(({ level, message, timestamp }) => {
  const localTimestamp = new Date(timestamp).toLocaleString()
  // let formattedMessage = message
  // if (level === 'error') {
  //   formattedMessage = chalk.red(message)
  // } else if (level === 'info') {
  //   formattedMessage = chalk.green(message)
  // }
  return `${localTimestamp} [${level}]: ${message}`
})

const logger = winston.createLogger({
  level: 'info', // Set the desired log level here (e.g., 'info', 'error', etc.)
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UB - %DATE% - error.log',
      ),
      datePattern: 'DD-MM-YYYY - HH-mm-ss',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'info',
        'UB - %DATE% - info.log',
      ),
      datePattern: 'DD-MM-YYYY-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'info',
    }),
  ],
})

export default logger
