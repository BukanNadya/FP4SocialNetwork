import { describe, test, expect } from '../base';

describe('404 Not Found Page', () => {
    test('should display the feed and login UI at any page for non-logged in user', async ({ commonActions, notFoundPage }) => {
        await notFoundPage.openNonExistingPage();
        await commonActions.verifyLoggedOutUi();
    });
    test('should display "404 page not found" when visiting a non-existent page for logged in user', async ({ commonActions, notFoundPage }) => {
        await commonActions.login();
        await notFoundPage.openNonExistingPage();
        await notFoundPage.verify404Label();
    });
});

// describe('Home Page', () => {
//     test('Login - should log in successfully', async ({ commonAction, homePage }) => {
//         await commonAction.login();
//     });
// });