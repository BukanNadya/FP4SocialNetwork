import { BASE_API_URL, BASE_URL } from "../utils/constants";
import { expect } from "../base";

export class HomePage {

    static SELECTOR = {
        POSTING_BUTTON: "posting_button",
        POST_TEXT_INPUT: "post_text_input",
        USER_POST_TEXT: "user_post_text",
        ICON_BUTTON_ADD_LIKE: "icon_button_add_like",
        WHITE_LIKE_BUTTON: "white_like_icon",
        RED_LIKE_ICON: "red_like_icon",
        POST_ID: "postId_35056",
        REPOST_POST: "repost_post",
        REPOST_BUTTON: "repost_button",
        REPOST_COUNT: "repost_count",
        LIKE_COUNT:"like_count",
    };

    constructor(page) {
        this.page = page;
    }

    async verifyAddPost() {
        const mockObj = {
            isReposted: false,
            likesCount: 3,
            name: "Sanchoous",
            photoFileLink: "http://res.cloudinary.com/dir4ciwiy/image/upload/v1687444289/production/t99pwbtpfpncilfbhiwf.png",
            postCommentsCount: 1,
            postId: 35056,
            profileImageLink: "http://res.cloudinary.com/dir4ciwiy/image/upload/v1686407058/production/pmtn5n3rijffz4zuq4km.png",
            repostsCount: 0,
            sentDateTime: "2023-06-28T20:58:51.580775",
            userId: 65,
            username: "banan",
            viewCount: 495,
            writtenText: "щзщзщзщзщзщ",
        };
        await this.page.route(`${BASE_API_URL}/api/posts`, (route, req) => {
            route.fulfill({
                body: JSON.stringify(mockObj)
            });
        });
        await this.page.getByPlaceholder("What's happening").fill("щзщзщзщзщзщ");
        await this.page.getByTestId(HomePage.SELECTOR.POSTING_BUTTON).getByText("Post").click();
        await expect(this.page.getByTestId(HomePage.SELECTOR.USER_POST_TEXT).getByText("щзщзщзщзщзщ")).toBeVisible();
    }

    async verifyAddLikeHandle() {
        await this.page.getByTestId(HomePage.SELECTOR.POST_ID).getByTestId(HomePage.SELECTOR.ICON_BUTTON_ADD_LIKE).click();
        await expect(this.page.getByTestId(HomePage.SELECTOR.POST_ID).getByTestId(HomePage.SELECTOR.RED_LIKE_ICON)).toBeVisible();
        await expect(this.page.getByTestId(HomePage.SELECTOR.POST_ID).getByTestId(HomePage.SELECTOR.LIKE_COUNT).locator('text=4')).toBeVisible();

    }

    async verifyAddRepostHandle() {
        await this.page.getByTestId(HomePage.SELECTOR.POST_ID).getByTestId(HomePage.SELECTOR.REPOST_BUTTON).click();
        await expect(this.page.getByTestId(HomePage.SELECTOR.POST_ID).getByTestId(HomePage.SELECTOR.REPOST_COUNT).locator('text=1')).toBeVisible();
    }

    async openHomePage() {
        await this.page.goto(`${BASE_URL}/home`);
    }

}