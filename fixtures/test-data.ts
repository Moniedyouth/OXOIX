import { RandomDataGenerator } from '../helpers/random-data-generator';

/**
 * Test data for registration and profile management
 */
export const testData = {
  // Registration details
  registration: {
    // Static test data
    static: {
      email: 'max1794max@gmail.com',
      password: '123qwe!@#QWE',
    },
    // Dynamically generated data
    dynamic: RandomDataGenerator.generateUserData(),
  },
  
  // User profile data
  profile: {
    // Possible floor options
    genders: ['male', 'female', 'other'],
    // Date of birth (for users over 18 years old)
    birthDate: {
      day: '15',
      month: '06',
      year: '1990',
    },
    // Canadian provinces and territories
    canadianProvinces: [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Yukon'
    ],
  },
  
  // Expected values ​​for checks
  expectedValues: {
    country: 'Canada',
    currency: 'CAD',
    province: 'Ontario',
  },
};

// Function to get fresh random data for each test run
export function getFreshUserData() {
  return RandomDataGenerator.generateUserData();
}
