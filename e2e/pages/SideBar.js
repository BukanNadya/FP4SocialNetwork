import { expect } from "../base";
import { BASE_URL } from "../utils/constants";

export class SideBar {

    static SELECTOR = {
        SIDEBAR_FOR_HOME_PAGE: "sidebar_for_home_page",
        EXPLORE_POSTS_WRAPPER: "explore_posts_wrapper",
        HEADER_TEXT_ROUTES: "header_text_routes",
        FAB_OF_EXPLORE_TEXT: "fab_of_explore_text",
        NOTIFICATIONS_LIST: "notifications_list",
        POPUlAR_PEOPLE_SIDEBAR: "popular_people_sidebar",
        MESSAGE_SEARCH_AND_INBOX_WRAPPER: "message_search_and_inbox_wrapper",
        START_CHAT_TEXT: "start_chat_text",
        REGISTRATION_CONTAINER:"registration_page_container",

    };

    constructor(page) {
        this.page = page;
    }

    async explorePageOpen() {
        await this.page.getByText("Explore").click();
        await expect(this.page.getByTestId(SideBar.SELECTOR.EXPLORE_POSTS_WRAPPER)).toBeInViewport();
        await expect(this.page.getByTestId(SideBar.SELECTOR.POPUlAR_PEOPLE_SIDEBAR)).toBeInViewport();
        await this.page.getByTestId(SideBar.SELECTOR.HEADER_TEXT_ROUTES).textContent("Explore");
    }

    async notificationsPageOpen() {
        await this.page.getByText("Notifications").click();
        await expect(this.page.getByTestId(SideBar.SELECTOR.NOTIFICATIONS_LIST)).toBeInViewport();
        await expect(this.page.getByTestId(SideBar.SELECTOR.POPUlAR_PEOPLE_SIDEBAR)).toBeInViewport();
        await this.page.getByTestId(SideBar.SELECTOR.HEADER_TEXT_ROUTES).textContent("Notifications");
    }

    async messagePageOpen() {
        await this.page.getByText("Message").click();
        await expect(this.page.getByTestId(SideBar.SELECTOR.MESSAGE_SEARCH_AND_INBOX_WRAPPER)).toBeInViewport();
        await expect(this.page.getByTestId(SideBar.SELECTOR.START_CHAT_TEXT)).toBeInViewport();
        await this.page.getByTestId(SideBar.SELECTOR.HEADER_TEXT_ROUTES).textContent("Messages");
    }

    async verifyLogOut() {
        await this.page.getByText("Log out").click();
        await expect(this.page.getByTestId(SideBar.SELECTOR.REGISTRATION_CONTAINER)).toBeInViewport();
    }


}