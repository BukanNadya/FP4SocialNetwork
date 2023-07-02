import { describe, test } from "../base";

describe("Home Page", () => {
    test("Add post success", async ({ homePage, page }) => {
        await homePage.openHomePage();
        await page.waitForLoadState();
        await homePage.verifyAddPost();
    });

    test("Get explore route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForLoadState();
        await sideBar.explorePageOpen();
    });

    test("Get notification route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForLoadState();
        await sideBar.notificationsPageOpen();
    });

    test("Get message route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForLoadState();
        await sideBar.messagePageOpen();
    });

    test("Add like success", async ({ homePage, page }) => {
        await homePage.openHomePage();
        await page.waitForLoadState();
        await homePage.verifyAddPost();
        await homePage.verifyAddLikeHandle();
    });
});