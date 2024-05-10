import { test, expect } from '@playwright/test';

test('Search for "Football" on BBC Sport', async ({ page }) => {
  // Step 1: Navigate to https://www.bbc.co.uk/sport
  await page.goto('https://www.bbc.co.uk/sport');
  
  // Step 2: Locate the search field in header
  const searchFieldHeader = await page.getByLabel('Search BBC');
  await searchFieldHeader.click();

  //Step 3: Enter search term
  const searchTerm = await page.getByPlaceholder('Search the BBC');
  await searchTerm.fill('Football');

  // Step 4: Click the Search button
    const searchButton = await page.locator('button[type="submit"]');
    await searchButton.click();


  // Step 5: Validate results
  const filteredResults = await page.locator('//ul[@role="list"]/li//span').filter({ hasText: 'Football' });
  const footballResult = await filteredResults.first();
  await expect(footballResult).toContainText('Football');
        
});