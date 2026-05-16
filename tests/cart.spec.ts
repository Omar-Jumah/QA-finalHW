import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Add single item to cart', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.goToCart();

    expect(await cart.getCount()).toBe(1);
  });

  test('Add multiple items to cart', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.addToCart('sauce-labs-bike-light');
    await inv.goToCart();

    expect(await cart.getCount()).toBe(2);
  });
});