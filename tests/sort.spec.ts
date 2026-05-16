import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';

const sortOptions = [
  { value: 'az', label: 'A to Z' },
  { value: 'hilo', label: 'Price High to Low' },
];

test.describe('Sort Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/inventory.html');
  });

  for (const option of sortOptions) {
    test(`Sort: ${option.label}`, async ({ page }) => {
      const inv = new InventoryPage(page);
      await inv.sortBy(option.value);

      if (option.value === 'az') {
        const names = await inv.getItemNames();
        expect(names).toEqual([...names].sort());
      } else {
        const prices = await inv.getItemPrices();
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
      }
    });
  }
});