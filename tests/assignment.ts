import { test, expect } from '@playwright/test';

(async () => {
    let browser: Browser | undefined;
    try {
        // Launch a new browser instance (you can choose 'firefox' or 'webkit' as well)
        browser = await chromium.launch();

        // Create a new page
        const page: Page = await browser.newPage();

        // Navigate to the BBC Sport website
        await page.goto('https://www.bbc.co.uk/sport');

        // Find the search input field and enter "football"
        await page.fill('#orb-search-q', 'football');
        await page.press('#orb-search-q', 'Enter');

        // Wait for search results to load
        await page.waitForSelector('.search-results');

        // Get the search results text
        const searchResultsText = await page.textContent('.search-results');

        // Perform assertions
        if (searchResultsText.includes('football')) {
            console.log('Search results contain the word "football". Test passed!');
        } else {
            console.error('Search results do not contain the word "football". Test failed.');
        }

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('Error occurred:', error);
        if (browser) {
            await browser.close();
        }
    }
})();