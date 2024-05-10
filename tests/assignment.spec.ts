import { test, expect } from '@playwright/test';

test('Search for "Football" on BBC Sport', async ({ page }) => {
  // Step 1: Navigate to https://www.bbc.co.uk/sport
  await page.goto('https://www.bbc.co.uk/sport');
  

  // Step 2: Locate the search field
  const searchField = await page.locator('input[name="q"]');
  test.setTimeout(150_000); // Set a longer timeout (e.g., 150 seconds)
  await searchField.fill('Football');

  // Step 3: Click the Search button
  const searchButton = await page.locator('button[type="submit"]');
  await searchButton.click();

  // Step 4: Verify results
  const results = await page.locator('.search-results');
  await expect(results).toHaveText('Football');
});