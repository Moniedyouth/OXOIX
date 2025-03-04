import winston from 'winston';
import { environment } from '../config/environment.config';

// Create a logger with formatting settings
const logger = winston.createLogger({
  level: environment.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/test-execution.log' })
  ]
});

export default logger;

// Helper functions to simplify logging in tests
export const logInfo = (message: string): void => {
  logger.info(message);
};

export const logError = (message: string, error?: Error): void => {
  if (error) {
    logger.error(`${message}: ${error.message}`);
  } else {
    logger.error(message);
  }
};

export const logStep = (step: string): void => {
  logger.info(`STEP: ${step}`);
};

export const logWarning = (message: string): void => {
  logger.warn(message);
};
