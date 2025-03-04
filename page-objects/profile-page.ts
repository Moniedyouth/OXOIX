import { Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { PersonalProfileFormComponent } from "../components/personal-profile-form.component";
import { logStep } from "../helpers/logger";
import { Assertions } from "../utils/assertions";

export class ProfilePage extends BasePage {
  readonly profileForm: PersonalProfileFormComponent;

  constructor(page: Page) {
    super(page);
    this.profileForm = new PersonalProfileFormComponent(page);
  }

  /**
   * Navigate to the profile page
   */
  async navigate(): Promise<void> {
    logStep("Navigating to profile page");
    await this.navigateTo("/profile");
    await this.waitForPageLoad();
  }

  /**
   * Verify profile page is loaded
   */
  async verifyProfilePageLoaded(): Promise<void> {
    logStep("Verifying profile page loaded");
    await Assertions.urlContains(this.page, "profile", "User profile page is loaded");
  }

  /**
   * Select Ontario state
   */
  async selectOntarioState(): Promise<void> {
    logStep("Selecting Ontario state");
    await this.profileForm.selectOntarioState();
  }

  /**
   * Set user gender
   */
  async setGender(): Promise<void> {
    logStep("Setting user gender");
    await this.profileForm.selectGender();
  }

  /**
   * Set birth date
   */
  async setBirthDate(day: string, month: string, year: string): Promise<void> {
    logStep("Setting birth date");
    await this.profileForm.setBirthDate(day, month, year);
  }

  /**
   * Save profile changes
   */
  async saveProfile(): Promise<void> {
    logStep("Saving profile changes");
    await this.profileForm.saveProfile();
  }

  /**
   * Verify saved profile data
   */
  async verifyProfileData(state: string, gender: boolean, day: string, month: string, year: string): Promise<void> {
    logStep("Verifying profile data saved correctly");
    await this.profileForm.verifyProfileData(state, gender, day, month, year);
  }

  /**
   * Logout from the profile page
   */
  async logout(): Promise<void> {
    logStep("Logging out from profile page");
    await this.profileForm.logout();
  }
}
