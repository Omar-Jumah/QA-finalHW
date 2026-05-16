import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://www.saucedemo.com');
await page.locator('[data-test="username"]').fill(process.env.APP_USERNAME!);
await page.locator('[data-test="password"]').fill(process.env.APP_PASSWORD!);
  await page.locator('[data-test="login-button"]').click();
  await page.waitForURL('**/inventory.html');
  
  await page.context().storageState({ path: 'auth/state.json' });
  await browser.close();
}

export default globalSetup;