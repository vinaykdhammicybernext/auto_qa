import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "../data/users";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.selectEmailLogin();

  await loginPage.requestOtP(USERS.standard.email!);

  await page.pause();

  await expect(page).toHaveURL(/account/);
});

// test("email is invalid", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.goto();
//   await loginPage.selectEmailLogin();

//   await loginPage.requestOtP(USERS.invalid.email);

//   await expect(
//     page.getByRole("heading", { name: "Please enter valid email id" }),
//   ).toBeVisible();

// });
