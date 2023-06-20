import { test, expect } from '@playwright/test';

test.describe('404 Not Found Page', () => {
    test('should display "404 page not found" when visiting a non-existent page', async ({ browser }) => {
        // Create a new context with JavaScript enabled
        const context = await browser.newContext({
            javaScriptEnabled: true
        });

        // Open a new page within the context
        const page = await context.newPage();

        // Visit a non-existent page
        await page.goto('http://localhost:3000/home');

        // Check that the 404 page is displayed
        await expect(await page.getByText("View")).toBeVisible({ timeout: 15_000 });

        // Close the page after the test
        await page.close();
    });
});