import { Page } from '@playwright/test';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeItem(itemId: string) {
    await this.page.locator(`[data-test="remove-${itemId}"]`).click();
  }

  async getCount() {
    return await this.page.locator('.cart_item').count();
  }

  async goToCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}