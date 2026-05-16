import { Page } from '@playwright/test';

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(itemId: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async sortBy(value: string) {
    await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
  }

  async getItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }
}