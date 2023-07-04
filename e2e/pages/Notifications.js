import { BASE_API_URL, BASE_URL } from "../utils/constants";
import { expect } from "../base";

export class Notifications {
    static SELECTOR = {
        POSTING_BUTTON: "posting_button",
        NOTIFICATION_EVENT_ID: "notification_31",
        NOTIFICATIONS_LIST: "notifications_list",
        NOTIFICATIONS_POST_WRAPPER_VIEW:"notifications_post_wrapper_view",
    };

    constructor(page) {
        this.page = page;
    }

    async openNotificationsPage() {
        await this.page.goto(`${BASE_URL}/notifications`);
    }

    async notificationView() {
        await this.page.getByTestId(Notifications.SELECTOR.NOTIFICATIONS_LIST).getByTestId(Notifications.SELECTOR.NOTIFICATION_EVENT_ID).click();
        await expect(this.page.getByTestId(Notifications.SELECTOR.NOTIFICATIONS_POST_WRAPPER_VIEW)).toBeVisible();
    }
}