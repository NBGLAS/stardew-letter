const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    reporter: "list",
    use: {
        baseURL: "http://127.0.0.1:8000",
        trace: "on-first-retry",
    },
    webServer: {
        command: "npx -y http-server -p 8000",
        url: "http://127.0.0.1:8000",
        reuseExistingServer: true,
        timeout: 120000,
    },
    projects: [
        {
            name: "chromium-desktop",
            use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1200 } },
        },
        {
            name: "mobile-chrome",
            use: { ...devices["Pixel 7"] },
        },
    ],
});
