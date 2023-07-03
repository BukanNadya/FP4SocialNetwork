import { test as base } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from "./pages/NotFoundPage";
import { CommonActions } from "./pages/CommonActions";
import { SideBar } from "./pages/SideBar";
import { Notifications } from "./pages/Notifications";

export const test = base.extend({
    notFoundPage: async ({ page }, use) => {
        await use(new NotFoundPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    commonActions: async ({ page }, use) => {
        await use(new CommonActions(page));
    },
    sideBar: async ({ page }, use) => {
        await use(new SideBar(page));
    },
    notifications: async ({ page }, use) => {
        await use(new Notifications(page));
    }
});

export const describe = test.describe;
export const beforeAll = test.beforeAll;
export const afterAll = test.afterAll;
export const beforeEach = test.beforeEach;
export const afterEach = test.afterEach;
export { expect } from '@playwright/test';