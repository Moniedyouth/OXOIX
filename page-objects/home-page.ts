import { Page} from '@playwright/test';
import { BasePage } from './base-page';
import { logStep } from '../helpers/logger';
import { Assertions } from '../utils/assertions';
import { HeaderComponent } from "../components/header.component";
import { LoginFormComponent } from '../components/login-form.component';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;
  readonly loginForm: LoginFormComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.loginForm = new LoginFormComponent(page);
  }

  async loginUser(userEmail: string, userPassword: string): Promise<void> {
    logStep('Navigating to login form and login user');
    await super.navigate();
    await this.header.signInButton.click();
    await this.waitForPageLoad();
    await this.fillWhenReady(this.loginForm.emailInput, userEmail);
    await this.fillWhenReady(this.loginForm.passwordInput, userPassword);
    await this.clickWhenReady(this.loginForm.logInButton);
    await Assertions.hasText(this.header.userNickname, userEmail, 'User login successfully');
  }

  async goToRegistrationForm(): Promise<void> {
    logStep('Navigating to registration form');
    await super.navigate();
    await this.header.signUpButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Checking that user is logged in
   */
  async verifyLoggedIn(): Promise<void> {
    logStep('Verifying user is logged in');
    await Assertions.isVisible(this.header.userNickname, 'User nickname is visible');
  }

  /**
   * Checking if you have successfully logged out of your account
   */
   async verifySuccessfulLogout(): Promise<void> {
    logStep("Verifying successful logout");
    await Assertions.isVisible(this.header.signInButton, "User is redirected to login page after logout");
  }
  
}
