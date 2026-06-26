import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { USERS } from "../data/users";

test("user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);
  await expect(page).toHaveURL(/inventory.html/);
});

test("invalid username", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(USERS.invalid.username, USERS.invalid.password);
  expect(
    page.getByText(
      "Username and password do not match any user in this service",
    ),
  );
  await expect(page).not.toHaveURL(/inventory.html/);
});
