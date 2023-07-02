import { describe, test } from "../base";

describe("404 Not Found Page", () => {
    describe("for non-logged-in user", () => {
        test.use({ storageState: { cookies: [], origins: [] } });

        test("should display the feed and login UI at any page for non-logged in user", async ({ commonActions, notFoundPage }) => {
            await notFoundPage.openNonExistingPage();
            await commonActions.verifyLoggedOutUi();
        });
    });

    describe("for logged-in user", () => {
        test("should display '404 page not found' when visiting a non-existent page for logged in user", async ({ notFoundPage }) => {
            await notFoundPage.openNonExistingPage();
            await notFoundPage.verify404Label();
        });
    });
});