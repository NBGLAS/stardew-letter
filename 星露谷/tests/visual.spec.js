const { test, expect } = require("@playwright/test");

test.describe("Stardew mail visuals", () => {
    test("首页主视觉稳定", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: "重新播放信件打字动画" }).waitFor();
        await expect(page).toHaveScreenshot("home-light.png", {
            fullPage: true,
            animations: "disabled",
        });
    });

    test("主题切换后界面稳定", async ({ page }) => {
        await page.goto("/");
        await page.getByRole("button", { name: "切换亮色或暗色主题" }).click();
        await expect(page).toHaveScreenshot("home-dark.png", {
            fullPage: true,
            animations: "disabled",
        });
    });

    test("组件演示页稳定", async ({ page }) => {
        await page.goto("/components.html");
        await page.getByRole("button", { name: "切换主题" }).waitFor();
        await expect(page).toHaveScreenshot("components.png", {
            fullPage: true,
            animations: "disabled",
        });
    });
});
