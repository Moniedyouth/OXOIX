import { PlaywrightTestConfig, devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: PlaywrightTestConfig = {
  testDir: '../tests',
  timeout: 60000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }]
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    locale: 'en-CA',
    timezoneId: 'America/Toronto',
    geolocation: { 
      latitude: 43.6532, // Toronto, Canada
      longitude: -79.3832 
    },
    permissions: ['geolocation'],
    baseURL: process.env.BASE_URL || 'https://rocketplay.com',
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

export default config;
