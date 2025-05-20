// tests/home.spec.ts
import { test, expect } from '@playwright/test';

test('Homepage loads and filters work', async ({ page }) => {
  await page.goto('https://fakestoreapi.com');
  await expect(page.locator('text=Loading...')).not.toBeVisible();
  await page.click('button:has-text("Electronics")');
  await expect(page.locator('.product-grid >> .product-card')).toHaveCount(5); // Assuming mock API returns 5 items
});