const { test, expect } = require('@playwright/test');

test('fluxo completo do Swag Labs', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="item-4-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="back-to-products"]').click();

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();

  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await page.locator('[data-test="firstName"]').fill('abcde');
  await page.locator('[data-test="lastName"]').fill('s');
  await page.locator('[data-test="postalCode"]').fill('dasas');
  await page.locator('[data-test="continue"]').click();

  await page.locator('[data-test="error"]').click();
  await page.locator('[data-test="checkout-info-container"] div').filter({ hasText: 'Error: Last Name is required' }).nth(2).click();

  // Verificação simples: botão "Finish" visível
  await expect(page.locator('[data-test="finish"]')).toBeVisible();
});
