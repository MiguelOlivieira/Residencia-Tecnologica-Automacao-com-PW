/**
* Checkout (US-004)
*
*  Aluno responsável:  Nicolas Klayvert
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

/**
* Teste 01:
*   Após adicionar pelo menos um item no carrinho, deve ser possível concluir a compra 
*   inserindo os dados do comprador (Primeiro nome, ultimo nome e CEP)
*/
test('Concluir Compra', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NicoGames');
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
});

/** 
 * Teste 02:
 *  Após adicionar pelo menos um item no carrinho, deve ser possível concluir a compra 
 *  inserindo os dados do comprador (Primeiro nome, ultimo nome e CEP)
*/
test('Tela de Confirmação', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NicoGames');
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
})

/** 
 * Teste 03:
 *  A transação pode ser cancelada através do botão Cancel
*/
test('Teste 3', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NicoGames');
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="cancel"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
})

/**
 * Teste 04:
 *  Todos os campos devem ser obrigatórios
 *  Deve exibir: "Error: First Name is required"
 */
test('Validar campos obrigatórios - Todos os campos em branco', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});