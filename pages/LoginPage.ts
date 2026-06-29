import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly emailLogin: Locator;
  readonly emailField: Locator;
  readonly phoneLogin: Locator;
  readonly phoneField: Locator;
  readonly requestOTPBtn: Locator;
  constructor(private page: Page) {

    this.emailLogin = this.page
      .getByRole("paragraph")
      .filter({ hasText: /^Email$/ });
    this.emailField = this.page.getByRole("textbox", { name: "Email" });
    this.phoneLogin = this.page
      .getByRole("paragraph")
      .filter({ hasText: /^Phone$/ });
    this.phoneField = this.page.getByRole("textbox", { name: "Phone" });
    this.requestOTPBtn = this.page.getByRole("button", { name: "Request OTP" });
  }

  async selectEmailLogin() {
    await this.emailLogin.click();
  }

  async requestOtP(email: string) {
    await this.emailField.fill(email);
    await this.requestOTPBtn.click();
  }

  async goto() {
    await this.page.goto(
      "/account/login?return_url=%2Faccount",
    );
  }
}
