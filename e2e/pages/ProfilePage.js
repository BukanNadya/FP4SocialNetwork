import { BASE_API_URL, BASE_URL } from "../utils/constants";
import { expect } from "../base";

export class ProfilePage {
    static SELECTOR = {
        BG_IMAGE_WRAPPER: "bg_image_wrapper",
        USER_PROFILE_PHOTO: "user_profile_photo",
        PROFILE_NAME_USER: "profile_name_user",
        PROFILE_NIK_USER: "profile_nik_user",
        PROFILE_REGISTRATION_DATE: "profile_registration_date",
        PROFILE_FOLLOWERS: "profile_followers",
        PROFILE_FOLLOWING: "profile_following",
        PROFILE_POSTS_TAB: "profile_posts_tab",
        REPOSTS_PROFILE_BUTTON: "reposts_profile_button",
        PROFILE_REPOSTS_TAB: "profile_reposts_tab",
        LIKE_PROFILE_BUTTON: "like_profile_button",
        PROFILE_LIKES_TAB: "profile_likes_tab",
        FOLLOWINGS_LIST: "followings_list",
        PROFILE_FOLLOWING_TAB_PANEL: "profile_following_tab_panel",
        FOLLOWERS_LIST: "followers_list",
        EDIT_PROFILE_BUTTON: "edit_profile_button",
        EDIT_PROFILE_FORM: "edit_profile_form",
    };

    constructor(page) {
        this.page = page;
    }

    async verifyProfileView() {
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.BG_IMAGE_WRAPPER)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.USER_PROFILE_PHOTO)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_NAME_USER)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_NIK_USER)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_REGISTRATION_DATE)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_FOLLOWERS)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_FOLLOWING)).toBeVisible();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_POSTS_TAB)).toBeVisible();
    }

    async verifyFollowPagesView() {
        await this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_FOLLOWERS).click();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.FOLLOWINGS_LIST)).toBeVisible();
        await this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_FOLLOWING_TAB_PANEL).click();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.FOLLOWERS_LIST)).toBeVisible();
    }

    async verifyProfileTabPanel() {
        await this.page.getByTestId(ProfilePage.SELECTOR.REPOSTS_PROFILE_BUTTON).click();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_REPOSTS_TAB)).toBeVisible();
        await this.page.getByTestId(ProfilePage.SELECTOR.LIKE_PROFILE_BUTTON).click();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.PROFILE_LIKES_TAB)).toBeVisible();
    }

    async verifyEditProfileButton() {
        await this.page.getByTestId(ProfilePage.SELECTOR.EDIT_PROFILE_BUTTON).click();
        await expect(this.page.getByTestId(ProfilePage.SELECTOR.EDIT_PROFILE_FORM)).toBeVisible();
    }

    async openProfilePage() {
        await this.page.goto(`${BASE_URL}/profile`);
    }
}