import { Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillAndContinue() {
    await this.page.locator('[data-test="firstName"]').fill('Ahmad');
    await this.page.locator('[data-test="lastName"]').fill('Test');
    await this.page.locator('[data-test="postalCode"]').fill('12345');
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }

  getSuccessMsg() {
    return this.page.locator('.complete-header');
  }
}