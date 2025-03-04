import { Page, Locator } from "@playwright/test";
import logger, { logStep } from "../helpers/logger";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the specified URL.
   * If a relative URL is provided, it prepends the base URL.
   */
  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to ${url}`);
    // Get baseURL from environment or use default
    const baseURL = process.env.BASE_URL || "https://rocketplay.com";
    // If the URL starts with '/', prepend the base URL
    const fullUrl = url.startsWith("/") ? `${baseURL}${url}` : url;
    await this.page.goto(fullUrl);
  }

  /**
   * Navigates to the home page.
   */
  async navigate(): Promise<void> {
    logger.info("Navigating to home page");
    await this.navigateTo("/");
    await this.waitForPageLoad();
  }

  /**
   * Waits for the page load event.
   * Implement this according to your application's specifics.
   */

  async waitForPageLoad(): Promise<void> {
    logger.info("Waiting for page to load");
    await this.page.waitForTimeout(3000);
    await this.page.waitForLoadState("load");
  }

  /**
   * Waiting for element to be visible
   */
  async waitForVisible(locator: Locator, timeout = 10000): Promise<void> {
    logger.info(`Waiting for element to be visible`);
    await locator.waitFor({ state: "visible", timeout });
  }

  /**
   * Click on an element with a preliminary wait for its visibility
   */
  async clickWhenReady(locator: Locator, timeout = 10000): Promise<void> {
    await this.waitForVisible(locator, timeout);
    await locator.click();
  }

  /**
   * Filling a field with a preliminary wait for its visibility
   */
  async fillWhenReady(locator: Locator, value: string, timeout = 10000): Promise<void> {
    await this.waitForVisible(locator, timeout);
    await locator.fill(value);
  }

  /**
   * Select an option from the drop-down list
   */
  async selectOption(locator: Locator, option: string): Promise<void> {
    logger.info(`Selecting option: ${option}`);
    await locator.selectOption(option);
  }

  /**
   * Waiting for a URL containing the specified string
   */
  async waitForUrl(urlPart: string, timeout = 10000): Promise<void> {
    logger.info(`Waiting for URL containing: ${urlPart}`);
    await this.page.waitForURL(new RegExp(urlPart), { timeout });
  }

  /**
   * Pause
   */
  async pause(): Promise<void> {
    await this.page.pause()
  }
}
