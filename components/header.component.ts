import { Page, Locator } from '@playwright/test';
import logger from '../helpers/logger';
import { BasePage } from '../page-objects/base-page';

/**
 * Header
 */
export class HeaderComponent extends BasePage{
  // readonly page: Page;
  readonly signUpButton: Locator;
  readonly signInButton: Locator;

  readonly profileButton: Locator;
  readonly logoutButton: Locator;
  readonly userBalance: Locator;
  readonly userNickname: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpButton = page.locator('.header__auth [data-test="open-sign-up__button"]');
    this.signInButton = page.locator('.header__auth [data-test="open-sign-in__button"]');

    this.logoutButton = page.locator('[data-test="logout-button"], .logout-button');
    this.userBalance = page.locator('[data-test="user-balance"], .user-balance');
    this.userNickname = page.locator('[data-test="header__user-nickname"]');
    this.profileButton = page.locator('[data-test="dropdown-balance__profile-btn"]');
  }

  /**
   * Go to registered user profile
   */
  async goToProfile(): Promise<void> {
    logger.info('Navigating to user profile');
    await this.clickWhenReady(this.userNickname);
    await this.clickWhenReady(this.profileButton);
  }

  /**
   * Checking is user logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.userNickname.isVisible();
  }
}
