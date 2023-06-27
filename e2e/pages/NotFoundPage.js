import { expect } from '../base';
import { BASE_URL } from '../utils/constants';

export class NotFoundPage {

    static SELECTOR = {
        NOT_FOUND_404_LABEL_TEST_ID: "not_found_page",
    };

    constructor(page) {
        this.page = page;
    }

    async openNonExistingPage() {
        await this.page.goto(`${BASE_URL}/non-existing-page`);
    }

    async verify404Label() {
        await expect(await this.page.getByTestId(NotFoundPage.SELECTOR.NOT_FOUND_404_LABEL_TEST_ID)).toBeVisible();
    }

}