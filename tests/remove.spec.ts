import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove from Cart', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Add one item then remove it - cart should be empty', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.goToCart();
    expect(await cart.getCount()).toBe(1);

    await cart.removeItem('sauce-labs-backpack');
    expect(await cart.getCount()).toBe(0);
  });

  test('Add two items then remove one by one - cart should be empty', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.addToCart('sauce-labs-bike-light');
    await inv.goToCart();
    expect(await cart.getCount()).toBe(2);

    await cart.removeItem('sauce-labs-backpack');
    expect(await cart.getCount()).toBe(1);

    await cart.removeItem('sauce-labs-bike-light');
    expect(await cart.getCount()).toBe(0);
  });
});