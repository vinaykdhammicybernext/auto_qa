import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput = this.page.getByRole("textbox", { name: "Username" });
  passwordInput = this.page.getByRole("textbox", { name: "Password" });
  loginButton = this.page.getByRole("button", { name: "Login" });

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
