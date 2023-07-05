import { BASE_URL } from "../utils/constants";
import { expect } from "../base";

export class SettingsPage {
    static SELECTOR = {
       PASSWORD_SETTINGS: "password_settings",
       PASSWORD_SETTINGS_DETAILS: "password_settings_details",
       THEME_SETTINGS: "theme_settings",
       THEME_LABEL: "theme_label",
    };

    constructor(page) {
        this.page = page;
    }

    async verifySettingsView() {
        await this.page.getByTestId(SettingsPage.SELECTOR.PASSWORD_SETTINGS).click();
        await expect(this.page.getByTestId(SettingsPage.SELECTOR.PASSWORD_SETTINGS_DETAILS)).toBeVisible();
        await this.page.getByTestId(SettingsPage.SELECTOR.THEME_SETTINGS).click();
        await expect(this.page.getByTestId(SettingsPage.SELECTOR.THEME_LABEL)).toBeVisible();
    }

    async openSettingsPage() {
        await this.page.goto(`${BASE_URL}/settings`);
    }

}