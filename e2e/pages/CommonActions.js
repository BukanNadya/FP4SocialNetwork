import { expect } from "../base";
import { BASE_URL } from "../utils/constants";

export class CommonActions {

    static SELECTOR = {
        LOGIN_MODAL_BUTTON: "log_in_button_modal",
        SIDEBAR_FOR_HOME_PAGE: "sidebar_for_home_page",
        HEADER_INFORMATION_FOR_HOME_PAGE: "header_information_for_home_page",
        FOOTER_REGISTRATION_PAGE: "footer_registration_page",
        NEWS_FEED_REGISTRATION_PAGE_AND_RIGHT_SIDE_MENU: "news_feed_registration_page_and_right_side_menu",
        EMAIL_INPUT_MODAL: "email_modal_input",
        PASSWORD_INPUT_MODAL: "password_modal_input",
    };

    constructor(page) {
        this.page = page;
    }

    async verifyLoggedOutUi() {
        await expect(this.page.getByTestId(CommonActions.SELECTOR.FOOTER_REGISTRATION_PAGE)).toBeVisible();
        await expect(this.page.getByTestId(CommonActions.SELECTOR.NEWS_FEED_REGISTRATION_PAGE_AND_RIGHT_SIDE_MENU)).toBeVisible();
    }


    async login() {
        await this.page.goto(BASE_URL);
        await this.page.getByText("Log in").click();
        await this.page.locator("input[name=\"email\"]").fill("slonotop2103@gmail.com");
        await this.page.getByText("Next").click();
        await this.page.getByTestId(CommonActions.SELECTOR.PASSWORD_INPUT_MODAL).locator("input[name=\"password\"]").fill("241120Na");
        await this.page.getByTestId(CommonActions.SELECTOR.LOGIN_MODAL_BUTTON).click();
        await expect(this.page.getByTestId(CommonActions.SELECTOR.SIDEBAR_FOR_HOME_PAGE)).toBeVisible();
        await expect(this.page.getByTestId(CommonActions.SELECTOR.HEADER_INFORMATION_FOR_HOME_PAGE)).toBeVisible();
    }
}