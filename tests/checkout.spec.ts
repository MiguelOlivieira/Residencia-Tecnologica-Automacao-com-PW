/**
* Checkout (US-004) 
*
*  Aluno responsável:  Nicolas Klayvert
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

// ---------------------------------------------
// Cenário 01, 02 e 03 - Fluxo de checkout
// ---------------------------------------------
test.describe('Fluxo de Checkout', () => {
    test('Concluir Compra', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265');

        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    });

    test('Tela de confirmação aparece após preencher dados', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265');

        await page.locator('[data-test="continue"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
        await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    });

    test('Cancelar Transação', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265');

        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="cancel"]').click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

// ---------------------------------------------
// Cenário 04 - Campos obrigatórios
// ---------------------------------------------
test.describe('Validação de campos obrigatórios', () => {
    test('Todos os campos em branco', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    });

    test('Primeiro Nome em branco', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265');
        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    });

    test('Último Nome em branco', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('problem_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="postalCode"]').fill('90265');
        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
    });

    test('CEP em branco', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="continue"]').click();

        await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
    });
});

// ---------------------------------------------
// Cenário 05 - Tamanho dos campos
// ---------------------------------------------
test.describe('Validação de tamanho dos campos', () => {
    test('Limite de caracteres - Primeiro Nome (150)', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        const longFirstName = '6'.repeat(150);
        await page.locator('[data-test="firstName"]').fill(longFirstName);
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265888');

        const value = await page.locator('[data-test="firstName"]').inputValue();
        expect(value).toBe(longFirstName);

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('Limite de caracteres - Último Nome (250)', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        const longLastName = '9'.repeat(250);
        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill(longLastName);
        await page.locator('[data-test="postalCode"]').fill('90265888');

        const value = await page.locator('[data-test="lastName"]').inputValue();
        console.log(`Caracteres inseridos no último nome: ${value.length}`);

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });

    test('CEP aceita apenas 8 caracteres numéricos', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        const validPostalCode = '12345678';
        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill(validPostalCode);

        const value = await page.locator('[data-test="postalCode"]').inputValue();
        expect(value).toBe(validPostalCode);

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    });
});