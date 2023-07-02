import { test as setup } from "../base";
import { BASE_URL } from "../utils/constants";

setup("Login via UI modal", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByText("Log in").click();
    await page.locator("input[name=\"email\"]").fill("slonotop2103@gmail.com");
    await page.getByText("Next").click();
    await page.getByTestId("password_modal_input").locator("input[name=\"password\"]").fill("241120Na");
    await page.getByTestId("log_in_button_modal").click();
    await page.waitForURL(`${BASE_URL}/home`);
    await page.waitForResponse((req) => req.url().endsWith("/unread"));
    await page.context().storageState({ path: 'playwright/.auth/user.json' });
});