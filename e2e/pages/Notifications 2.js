import { BASE_API_URL, BASE_URL } from "../utils/constants";
import { expect } from "../base";

export class Notifications {
    static SELECTOR = {
        POSTING_BUTTON: "posting_button",
        NOTIFICATION_EVENT_ID:"notification_30"
    };

    constructor(page) {
        this.page = page;
    }



    async notificationView() {

    }

    async openHomePage() {
        await this.page.goto(`${BASE_URL}/notifications`);
    }
}