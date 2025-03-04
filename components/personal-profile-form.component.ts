import { Page, Locator, expect } from "@playwright/test";
import logger from "../helpers/logger";
import { BasePage } from "../page-objects/base-page";
import { Assertions } from "../utils/assertions";

/**
 * Компонент формы профиля пользователя
 */
export class PersonalProfileFormComponent extends BasePage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly stateDropdown: Locator;
  readonly ontarioState: Locator;
  readonly genderRadioButton: Locator;
  readonly birthDayInput: Locator;
  readonly birthMonthInput: Locator;
  readonly birthYearInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.stateDropdown = page.locator('[data-test="profile-main-edit__select--state"]');
    this.ontarioState = page.locator('[title="Ontario"]');
    this.genderRadioButton = page.locator('[data-test="profile-main-edit__input--gender-male"]');
    this.birthDayInput = page.locator('[data-test="birthday-edit__input--birthday-day"]');
    this.birthMonthInput = page.locator('[data-test="birthday-edit__input--birthday-month"]');
    this.birthYearInput = page.locator('[data-test="birthday-edit__input--birthday-year"]');
    this.saveButton = page.locator('[type="submit"]');
    this.logoutButton = page.locator('[class="profile-main__exit"] [data-test="profile__action--exit"]');
  }

  /**
   * choose Ontario State
   */
  async selectOntarioState(): Promise<void> {
    logger.info("Selecting Ontario state");
    await this.stateDropdown.scrollIntoViewIfNeeded();
    await this.stateDropdown.click();
    await this.ontarioState.scrollIntoViewIfNeeded();
    await this.ontarioState.click();
    await expect(this.ontarioState.nth(0)).toBeVisible();
  }

  /**
   * Choose male gender
   */
  async selectGender(): Promise<void> {
    logger.info(`Selecting gender: male`);
    await this.genderRadioButton.click();
  }

  /**
   * Установка даты рождения
   */
  async setBirthDate(day: string, month: string, year: string): Promise<void> {
    logger.info(`Setting birth date: ${day}/${month}/${year}`);
    await this.birthDayInput.fill(day);
    await this.birthMonthInput.fill(month);
    await this.birthYearInput.fill(year);
  }

  /**
   * Сохранение изменений профиля
   */
  async saveProfile(): Promise<void> {
    logger.info("Saving profile changes");
    await this.saveButton.click();
  }

  /**
   *  Check user data
   */
  async verifyProfileData(expectedState: string, expectedGender: boolean, birthDay: string, birthMonth: string, birthYear: string): Promise<void> {
    logger.info("Verifying profile data");

    await Assertions.hasText(this.stateDropdown, expectedState, "State is correctly saved");
    await Assertions.checkboxIsChecked(this.genderRadioButton, expectedGender, "Gender is correctly saved");
    await Assertions.hasValue(this.birthDayInput, birthDay, "Birth day is correctly saved");
    await Assertions.hasValue(this.birthMonthInput, birthMonth, "Birth month is correctly saved");
    await Assertions.hasValue(this.birthYearInput, birthYear, "Birth year is correctly saved");
  }

  /**
   * Logging out of your account via your profile page
   */
  async logout(): Promise<void> {
    logger.info("Logging out from profile page");
    await this.clickWhenReady(this.logoutButton);
  }
}
