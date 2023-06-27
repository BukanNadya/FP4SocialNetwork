import { BASE_URL } from '../utils/constants';

export class HomePage {

    static SELECTOR = {

    };

    constructor(page) {
        this.page = page;
    }

    async openHomePage() {
        await this.page.goto(`${BASE_URL}/home`);
    }

}