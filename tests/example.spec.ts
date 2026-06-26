import { test, expect } from "@playwright/test";

test("user can add product to cart", async ({ page }) => {
  await page.goto(
    "https://sauce-demo.myshopify.com/products/flower-print-jeans",
  );
  await page.getByLabel("Size").selectOption("L");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByRole("link", { name: /My Cart \(1\)/ })).toBeVisible();
  await page.reload();
  await page.getByRole("link", { name: /My Cart \(1\)/ }).click();
  const cartDrawer = page.locator("#drawer");
  await expect(cartDrawer).toBeVisible();
  await expect(cartDrawer.getByText("Black heels - L / Red")).toBeVisible();
  await page.getByRole("link", { name: "Check Out" }).click();
  await page.getByRole("button", { name: "Check Out" }).click();
  await expect(page).toHaveURL(/checkout/);
  await expect(page.getByRole("heading", { name: /Contact/i })).toBeVisible();
  await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
  await page.getByRole("textbox", { name: "First name" }).fill("Vinay");
  await page.getByRole("textbox", { name: "Last name" }).fill("Kumar");
  await page.getByRole("combobox", { name: "Address" }).click();
  await page
    .getByRole("combobox", { name: "Address" })
    .fill("sdfsafsafasfsaffsaf");
  await page.getByRole("textbox", { name: "City" }).fill("Mohali");
  await page.getByLabel("State").selectOption("PB");
  await page.getByRole("textbox", { name: "PIN code" }).fill("160055");
  await page
    .getByRole("textbox", { name: "Phone (optional)" })
    .fill("1234567890");
  const cardNumberFrame = page.frameLocator(
    'iframe[name*="card-fields-number"]',
  );
  const cardExpiryFrame = page.frameLocator(
    'iframe[name*="card-fields-expiry"]',
  );
  const cardSecurityCodeFrame = page.frameLocator(
    'iframe[name*="card-fields-verification_value"]',
  );
  const cardNameFrame = page.frameLocator('iframe[name*="card-fields-name"]');
  await cardNumberFrame.getByRole("textbox", { name: "Card number" }).fill("1");
  await cardExpiryFrame
    .getByRole("textbox", { name: "Expiration date (MM / YY)" })
    .fill("04 / 29");
  await cardSecurityCodeFrame
    .getByRole("textbox", { name: "Security code" })
    .fill("111");
  await cardNameFrame
    .getByRole("textbox", { name: "Name on card" })
    .fill("test");
  await page.getByRole("button", { name: "Pay now" }).click();
  await expect(page.getByRole("heading", { name: /Thank you/i })).toBeVisible();
});
