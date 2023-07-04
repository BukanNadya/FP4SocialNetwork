import { describe, test } from "../base";

describe("Settings page", () => {
    test("check settings view", async ({ settings, page }) => {
        await settings.openSettingsPage();
        await settings.verifySettingsView();
    });
});