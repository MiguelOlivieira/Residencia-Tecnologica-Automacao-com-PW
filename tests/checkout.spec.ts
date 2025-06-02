// Nicolas Klayvert

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

// Cenário 01
test('Checkout completo da compra', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('79015');

    const validacaoCompra = 'https://www.saucedemo.com/checkout-step-one.html'


    await expect(page).toHaveURL(validacaoCompra);
});

// Cenário 02
test('Tela de Confirmação', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('02040609');
    await page.locator('[data-test="continue"]').click();

    const validacaoCompra = 'https://www.saucedemo.com/checkout-step-two.html'


    await expect(page).toHaveURL(validacaoCompra);
})