import { Page, Locator, expect } from '@playwright/test';
import logger, { logStep } from '../helpers/logger';
import { BasePage } from '../page-objects/base-page';
import { Assertions } from '../utils/assertions';
import { HeaderComponent } from "../components/header.component";

/**
 * Registration Form Component
 */
export class RegistrationFormComponent extends BasePage{
  readonly header: HeaderComponent;
  readonly registrationModalContainer: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly newsletterCheckbox: Locator;
  readonly ageConfirmCheckbox: Locator;
  readonly termsCheckbox: Locator;
  readonly countrySelector: Locator;
  readonly currencyDisplay: Locator;
  readonly errorMessage: Locator;
  readonly passwordVisibilityToggle: Locator;
  readonly accountCreatedPopup: Locator;

  constructor(page: Page) {
    super(page)
    this.header = new HeaderComponent(page);
    this.registrationModalContainer = page.locator('.modal-sign-up');
    this.emailInput = page.locator('[data-test="registration__input--email"]');
    this.passwordInput = page.locator('[data-test="registration__input--password"]');
    this.registerButton = page.locator('[data-test="register-button"], button[type="submit"]');
    this.newsletterCheckbox = page.locator('[name="acceptReceiveEmail"] label span');
    this.ageConfirmCheckbox = page.locator('[name="acceptTerms"] label span');
    this.countrySelector = page.locator('[data-test="registration__select-country"]');
    this.currencyDisplay = page.locator('[data-test="registration__select-currency"]');
    this.errorMessage = page.locator('[data-test="error-message"], .error-message');
    this.passwordVisibilityToggle = page.locator('.password-field__icon');
    this.accountCreatedPopup = page.getByText('Account created');
  }

  async goToRegistrationForm(): Promise<void> {
    logStep('Navigating to registration form');
    await super.navigate();
    await this.header.signUpButton.click();
    await this.waitForPageLoad();
    await this.registrationModalContainer.isVisible();
  }

  /**
   * Fills the registration form with the given email and password
   */
  async fillRegistrationForm(email: string, password: string): Promise<void> {
    logger.info('Filling registration form');
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageConfirmCheckbox.check();
  }

  /**
   * Toggles the password visibility by clicking the visibility icon
   */
  async togglePasswordVisibility(): Promise<void> {
    logger.info('Toggling password visibility');
    await this.passwordVisibilityToggle.click();
  }

  /**
   * Verifies that the password is hidden (input type is "password")
   */
  async verifyPasswordIsHidden(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  /**
   * Verifies that the password is visible (input type is "text")
   */
  async verifyPasswordIsVisible(): Promise<void> {
    await expect(this.passwordInput).toHaveAttribute('type', 'text');
  }

  /**
   * Checks the age confirmation checkbox (user is 18+)
   */
  async confirmAge(): Promise<void> {
    logger.info('Confirming age (18+)');
    const isChecked = await this.ageConfirmCheckbox.isChecked();
    if (!isChecked) {
      await this.ageConfirmCheckbox.check();
    }
  }

  /**
   * Checks the terms and conditions checkbox
   */
  async acceptTerms(): Promise<void> {
    logger.info('Accepting terms and conditions');
    await this.ageConfirmCheckbox.check();
  }

  /**
   * Verifies the state of the newsletter checkbox
   */
  async verifyNewsletterStatus(shouldBeChecked: boolean): Promise<void> {
    logger.info(`Verifying newsletter checkbox is ${shouldBeChecked ? 'checked' : 'unchecked'}`);
    await Assertions.checkboxIsChecked(
      this.newsletterCheckbox,
      shouldBeChecked,
      `Newsletter checkbox is ${shouldBeChecked ? 'checked' : 'unchecked'}`
    );
  }

  /**
   * Verifies the state of the age confirmation checkbox
   */
  async verifyAgeConfirmStatus(shouldBeChecked: boolean): Promise<void> {
    logger.info(`Verifying age confirmation checkbox is ${shouldBeChecked ? 'checked' : 'unchecked'}`);
    await Assertions.checkboxIsChecked(
      this.ageConfirmCheckbox,
      shouldBeChecked,
      `Age confirmation checkbox is ${shouldBeChecked ? 'checked' : 'unchecked'}`
    );
  }

  /**
   * Retrieves the currently selected country
   */
  async getCurrentCountry(): Promise<string> {
    return await this.countrySelector.textContent() || '';
  }

  /**
   * Retrieves the currently displayed currency
   */
  async getCurrentCurrency(): Promise<string> {
    return await this.currencyDisplay.textContent() || '';
  }

  /**
   * Verifies that the auto-detected country and currency match the expected values
   */
  async verifyCountryAndCurrency(expectedCountry: string, expectedCurrency: string): Promise<void> {
    logger.info(`Verifying country is ${expectedCountry} and currency is ${expectedCurrency}`);
    await Assertions.hasText(
      this.countrySelector,
      expectedCountry,
      `Country is correctly detected as ${expectedCountry}`
    );
    await Assertions.hasText(
      this.currencyDisplay,
      expectedCurrency,
      `Currency is correctly set to ${expectedCurrency}`
    );
  }

  /**
   * Submits the registration form
   */
  async submitRegistration(): Promise<void> {
    logger.info('Submitting registration form');
    await this.registerButton.click();
  }

  /**
   * Complete registration process including form fill, checkbox verifications, accepting terms, and submission
   */
  async fillInformationForRegistrationNewUser(email: string, password: string): Promise<void> {
    await this.fillRegistrationForm(email, password);
  }

  /**
   * Verifies that Canadian localization (country and currency) is applied
   */
   async verifyCanadianLocalization(): Promise<void> {
    logStep('Verifying Canadian localization');
    await this.verifyCountryAndCurrency('Canada', 'CAD');
  }

  /**
   * Verifies that the checkbox states are correct
   * - Newsletter checkbox should be unchecked
   * - Age confirmation checkbox should be checked
   */
  async verifyCheckboxStates(): Promise<void> {
    logStep('Verifying default checkbox states');
    await this.verifyNewsletterStatus(false);
    await this.verifyAgeConfirmStatus(true);
  }

  async verifyAccountCreated(): Promise<void> {
    logStep('Verifying account created popup is visible');
    await expect(this.accountCreatedPopup).toBeVisible()
  }
}
