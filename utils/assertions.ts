import { Page, Locator, expect } from '@playwright/test';
import logger from '../helpers/logger';

export class Assertions {
  /**
   * Проверяет, что элемент видим на странице
   */
  static async isVisible(locator: Locator, message?: string): Promise<void> {
    try {
      await expect(locator).toBeVisible({ timeout: 10000 });
      if (message) logger.info(`✓ ${message}`);
    } catch (error) {
      if (message) logger.error(`✗ ${message}`, error as Error);
      throw error;
    }
  }

  /**
   * Проверяет, что элемент содержит определенный текст
   */
  static async hasText(locator: Locator, text: string, message?: string): Promise<void> {
    try {
      await expect(locator).toContainText(text, { timeout: 10000 });
      if (message) logger.info(`✓ ${message}`);
    } catch (error) {
      if (message) logger.error(`✗ ${message}`, error as Error);
      throw error;
    }
  }

  /**
   * Проверяет, что чекбокс имеет определенное состояние
   */
  static async checkboxIsChecked(locator: Locator, shouldBeChecked: boolean, message?: string): Promise<void> {
    try {
      if (shouldBeChecked) {
        await expect(locator).toBeChecked({ timeout: 10000 });
      } else {
        await expect(locator).not.toBeChecked({ timeout: 10000 });
      }
      if (message) logger.info(`✓ ${message}`);
    } catch (error) {
      if (message) logger.error(`✗ ${message}`, error as Error);
      throw error;
    }
  }

  /**
   * Проверяет, что элемент имеет определенное значение
   */
  static async hasValue(locator: Locator, value: string, message?: string): Promise<void> {
    try {
      await expect(locator).toHaveValue(value, { timeout: 10000 });
      if (message) logger.info(`✓ ${message}`);
    } catch (error) {
      if (message) logger.error(`✗ ${message}`, error as Error);
      throw error;
    }
  }

  /**
   * Проверяет, что URL страницы содержит определенный путь
   */
  static async urlContains(page: Page, urlPart: string, message?: string): Promise<void> {
    try {
      await expect(page).toHaveURL(new RegExp(urlPart), { timeout: 10000 });
      if (message) logger.info(`✓ ${message}`);
    } catch (error) {
      if (message) logger.error(`✗ ${message}`, error as Error);
      throw error;
    }
  }
}
