import { test, expect } from "@playwright/test";

test("user can submit form", async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: "eacsjcaxxy",
      password: "dx2tt5j6XX",
    },
  });

  const page = await context.newPage();

  await page.goto(
    "https://phpstack-994179-6153301.cloudwaysapps.com/contact/",
    {
      waitUntil: "domcontentloaded",
    },
  );

  await expect(page).toHaveURL(/contact/);

  await page.getByRole("textbox", { name: "Full Name" }).fill("test");
  await page.getByRole("textbox", { name: "Business Name" }).fill("cybernext");
  await page
    .getByRole("textbox", { name: "Email" })
    .fill("tester.cn123@gmail.com");
  await page.locator("#phonenumber").fill("1234567890");
  await page
    .locator("#your-message")
    .fill("this is for test for playwright for automation testing");

  await Promise.all([
    page.waitForURL(/thank-you/),
    page.getByRole("button", { name: "Let's Start This Properly" }).click(),
  ]);

  await expect(page).toHaveURL(/thank-you/);

  await context.close();
});
