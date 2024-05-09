// Prerequisites:
// - Ensure you have Node.js and npm installed.
// - Install the necessary dependencies using: npm install webdriverio @wdio/cli

// Import necessary modules
import { test, expect } from '@playwright/test';

// Configuration for WebDriverIO
const config = {
    runner: 'local',
    specs: ['./test/specs/*.js'], // Path to your test files
    capabilities: [{
        browserName: 'chrome', // You can choose other browsers as well
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.bbc.co.uk/sport', // Base URL for your tests
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
};

// Initialize WebDriverIO
const browser = await remote(config);

// Example test
describe('BBC Sport Search', () => {
    it('should search for "football" and verify results', async () => {
        // Navigate to the BBC Sport website
        await browser.url('/');

        // Find the search input field and enter "football"
        const searchInput = await browser.$('#orb-search-q');
        await searchInput.setValue('football');
        await searchInput.keys('Enter');

        // Wait for search results to load
        await browser.waitForExist('.search-results');

        // Verify that the search results contain the word "football"
        const searchResults = await browser.getText('.search-results');
        expect(searchResults).toContain('football');

        // Additional assertions or actions can be added here
    });
});

// Close the browser session
await browser.deleteSession();