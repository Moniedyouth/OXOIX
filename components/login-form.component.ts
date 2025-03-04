import { Page, Locator } from '@playwright/test';
import { BasePage } from '../page-objects/base-page';

export class LoginFormComponent extends BasePage{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;

    constructor (page: Page){
        super(page);
        this.emailInput = page.locator('[data-test="login__input--email"]');
        this.passwordInput = page.locator('[data-test="login__input--password"]');
        this.logInButton = page.locator('[type="submit"]');
    }
}