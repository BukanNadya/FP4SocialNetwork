import { describe, test } from "../base";

describe("Home Page", () => {
    test("Add post success", async ({ homePage, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await homePage.verifyAddPost();
    });

    test("Get explore route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await sideBar.explorePageOpen();
    });

    test("Get notification route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await sideBar.notificationsPageOpen();
    });

    test("Get message route success", async ({ homePage, sideBar, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await sideBar.messagePageOpen();
    });

    test("Add like success", async ({ homePage, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await homePage.verifyAddPost();
        await homePage.verifyAddLikeHandle();
    });
    test("Add repost success", async ({ homePage, page }) => {
        await homePage.openHomePage();
        await page.waitForTimeout(5000);
        await homePage.verifyAddPost();
        await homePage.verifyAddRepostHandle()
    });
});