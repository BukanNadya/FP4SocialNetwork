const { defineConfig, devices } = require("@playwright/test");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
    testDir: "tests",
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: "html",
    use: {
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        headless: !!process.env.CI,
    },
    projects: [
        {
            name: "setup",
            testMatch: "tests/*.setup.js",
        },
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                storageState: "playwright/.auth/user.json",
            },
            dependencies: ["setup"],
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                storageState: "playwright/.auth/user.json"
            },
            dependencies: ["setup"],
        },
    ],
    webServer: [
        {
            command: "cd ../social-network-ui && npm run start",
            port: 3000,
            reuseExistingServer: !process.env.CI,
        },
        {
            command: "cd ../social_network_api && mvn spring-boot:run",
            port: 8080,
            reuseExistingServer: !process.env.CI,
        },
    ],
});

