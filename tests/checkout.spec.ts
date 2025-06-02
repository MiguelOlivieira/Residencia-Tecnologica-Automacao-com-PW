/**
* Checkout (US-004)
*
*  Aluno respomsável:  Nicolas Klayvert
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

/**
* Teste 01:
*   Após adicionar pelo menos um item no carrinho, deve ser possível concluir a compra 
*   inserindo os dados do comprador (Primeiro nome, ultimo nome e CEP)
*/
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
    await page.locator('[data-test="postalCode"]').fill('90265');

    const validacao = 'https://www.saucedemo.com/checkout-step-one.html'


    await expect(page).toHaveURL(validacao);
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
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();

    const validacao = 'https://www.saucedemo.com/checkout-step-two.html'


    await expect(page).toHaveURL(validacao);
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
    await page.locator('[data-test="firstName"]').click();
    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').click();
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').click();
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="cancel"]').click();

    const validacao = 'https://www.saucedemo.com/inventory.html'


    await expect(page).toHaveURL(validacao);
})

/**
 * Teste 04:
 *  Todos os campos devem ser obrigatórios
 * 
 * (Em andamento    ...)
 */