"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
// import chalk from 'chalk'
const { combine, timestamp, printf } = winston_1.default.format;
const myFormat = printf(({ level, message, timestamp }) => {
    const localTimestamp = new Date(timestamp).toLocaleString();
    // let formattedMessage = message
    // if (level === 'error') {
    //   formattedMessage = chalk.red(message)
    // } else if (level === 'info') {
    //   formattedMessage = chalk.green(message)
    // }
    return `${localTimestamp} [${level}]: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(timestamp(), myFormat),
    transports: [
        new winston_1.default.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'errors', 'UB - %DATE% - error.log'),
            datePattern: 'DD-MM-YYYY - HH-mm-ss',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'winston', 'info', 'UB - %DATE% - info.log'),
            datePattern: 'DD-MM-YYYY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
        }),
    ],
});
exports.default = logger;
