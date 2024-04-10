import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  return;
  await page.goto("http://172.24.0.6:3000/");
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByText("Sign Up").click();
  await page.getByPlaceholder("name").click();
  await page.getByPlaceholder("name").fill("test12");
  await page.getByPlaceholder("name").fill("test12");
  await page.getByPlaceholder("name").press("Control+Shift+ArrowLeft");
  await page.getByPlaceholder("••••••••").click();
  await page.getByPlaceholder("••••••••").fill("playwrighTEST");
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole("button", { name: "Sign Up" }).click();
});
