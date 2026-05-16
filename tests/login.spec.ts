import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const users = [
  { username: 'standard_user', password: 'secret_sauce', success: true },
  { username: 'wrong_user', password: 'wrong_pass', success: false },
];

test.describe('Login Feature', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  for (const user of users) {
    test(`Login with ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await page.goto('/');
      await loginPage.login(user.username, user.password);

      if (user.success) {
        await expect(page).toHaveURL(/inventory/);
      } else {
        await expect(loginPage.getErrorMsg()).toBeVisible();
      }
    });
  }
});