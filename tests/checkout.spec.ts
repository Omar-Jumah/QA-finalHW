import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  test('Checkout single item', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.goToCart();
    await cart.goToCheckout();
    await checkout.fillAndContinue();
    await checkout.finish();

    await expect(checkout.getSuccessMsg()).toHaveText('Thank you for your order!');
  });

  test('Checkout multiple items', async ({ page }) => {
    const inv = new InventoryPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await inv.addToCart('sauce-labs-backpack');
    await inv.addToCart('sauce-labs-bike-light');
    await inv.goToCart();
    await cart.goToCheckout();
    await checkout.fillAndContinue();
    await checkout.finish();

    await expect(checkout.getSuccessMsg()).toHaveText('Thank you for your order!');
  });
});