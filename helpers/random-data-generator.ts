import { faker } from '@faker-js/faker';

// Generate random user data
export class RandomDataGenerator {
  static generateEmail(): string {
    return faker.internet.email().toLowerCase();
  }

  static generatePassword(): string {
    return `${faker.internet.password({length:10})}!A1`;
  }

  static generateUsername(): string {
    return faker.internet.username().replace(/[^a-zA-Z0-9]/g, '');
  }

  static generateBirthDate(minAge = 19, maxAge = 65): Date {
    return faker.date.birthdate({ min: minAge, max: maxAge, mode: 'age' });
  }

  static formatBirthDate(date: Date): { day: string; month: string; year: string } {
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    };
  }

  static generateUserData() {
    const birthDate = this.generateBirthDate();
    return {
      email: this.generateEmail(),
      password: this.generatePassword(),
      username: this.generateUsername(),
      birthDate: this.formatBirthDate(birthDate),
      gender: 'male'
    };
  }
}
