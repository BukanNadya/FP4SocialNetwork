import { expect } from "../base";
import { BASE_URL } from "../utils/constants";

export class CommonActions {

    static SELECTOR = {
        LOGIN_MODAL_BUTTON: "log_in_button_modal",
        SIDEBAR_FOR_HOME_PAGE: "sidebar_for_home_page",
        HEADER_INFORMATION_FOR_HOME_PAGE: "header_information_for_home_page",
    };

    constructor(page) {
        this.page = page;
    }

    async verifyLoggedOutUi() {

        // todo verify feed
        // todo verify log in bottom bar
        // todo verify log in right sidebar
    }

    async login() {
        await this.page.goto(BASE_URL);
        await this.page.click(":text(\"Log in\")");
        await this.page.fill("input[name=\"email\"]", "slonotop2103@gmail.com");
        await this.page.click(":text(\"Next\")");
        await this.page.fill("input[name=\"password\"]", "241120Na");
        await this.page.getByTestId(CommonActions.SELECTOR.LOGIN_MODAL_BUTTON).click();
        await expect(await this.page.getByTestId(CommonActions.SELECTOR.SIDEBAR_FOR_HOME_PAGE)).toBeVisible();
        await expect(await this.page.getByTestId(CommonActions.SELECTOR.HEADER_INFORMATION_FOR_HOME_PAGE)).toBeVisible();
    }
}