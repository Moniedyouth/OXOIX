// config/environment.config.ts
import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  baseUrl: process.env.BASE_URL || 'https://rocketplay.com',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '60000', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  ciHeadless: process.env.CI_HEADLESS === 'true',
  ciWorkers: parseInt(process.env.CI_WORKERS || '1', 10),
};
