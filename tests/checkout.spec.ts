import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

test('Checkout completo da compra', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Kanye');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Oeste');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('79015');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
  

    const validacaoCompra = 'https://www.saucedemo.com/checkout-complete.html'


    await expect(page).toHaveURL(validacaoCompra);
});