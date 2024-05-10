import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.bbc.co.uk/sport');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BBC Sport - Scores, Fixtures, News - Live Sport/);
});

test('should search for "football" and verify results', async ({ page }) => {


    // Find the search input field and enter "football"
    await page.fill('#orb-search-q', 'football');
    await page.press('#orb-search-q', 'Enter');

    // Wait for search results to load
    await page.waitForSelector('.search-results');

    // Verify that the search results contain the word "football"
    const searchResultsText = await page.textContent('.search-results');
    expect(searchResultsText).toContain('football');
});
