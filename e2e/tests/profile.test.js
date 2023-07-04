import { describe, test } from "../base";

describe("Profile page", () => {
    test("check profile view", async ({ profile, page }) => {
        await profile.openProfilePage();
        await profile.verifyProfileView();
    });
    test("check  profile tab panel", async ({ profile, page }) => {
        await profile.openProfilePage();
        await profile.verifyProfileTabPanel();
    });
    test("check  profile followings panel", async ({ profile, page }) => {
        await profile.openProfilePage();
        await profile.verifyFollowPagesView();
    });
    test("check  open edit profile modal", async ({ profile, page }) => {
        await profile.openProfilePage();
        await profile.verifyEditProfileButton();
    });


});