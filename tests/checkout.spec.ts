/**
* Checkout (US-004) 
*
*  Aluno responsável:  Nicolas Klayvert
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

/**
* Cenário - 01:
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
 * Cenário - 02:
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
 * Cenário - 03:
 *  A transação pode ser cancelada através do botão Cancel
*/
test('Cancelar Transação', async ({ page }) => {
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
 * Cenário 04 - 01:
 *  Todos os campos devem ser obrigatórios
 *  Deve exibir: "Error: First Name is required"
 */
test('Validar campos - Todos os campos em branco', async ({ page }) => {
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

/**
 * Cenário 04 - 02:
 *  Validação: Campo Primeiro Nome em branco
 *  Deve exibir "Error: First Name is required"
 */
test('Validar campos - Primeiro Nome em branco', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});

/**
 * Cenário 04 - 03:
 *  Validação: Campo Ultimo Nome em branco
 *  Deve exibir: "Error: Last Name is required"
 */
test('Validar campo - Último Nome em branco', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
});

/**
 * Cenário 04 - 04:
 *  Validação: Campo CEP em branco
 *  Deve exibir: "Error: Postal Code is required"
 */
test('Validar campo - CEP em branco', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
});

/**
 * Cenário 04 - 05
 * Validação: Limitação de campos
 * Primeiro Nome (150 caracteres)
 */
test('Validar limite de caracteres - Primeiro Nome', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    const longFirstName = '6'.repeat(150);

    await page.locator('[data-test="firstName"]').fill(longFirstName);
    await page.locator('[data-test="lastName"]').fill('Nery');
    await page.locator('[data-test="postalCode"]').fill('90265');

    const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
    expect(firstNameValue).toBe(longFirstName);

    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
});

/**
 * Cenário 04 - 06
 * Validação: Limitação de Campos
 * Último Nome (251 caracteres)
 */
test('Validar limite de caracteres - Último Nome', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    const tooLongLastName = '9'.repeat(251);
    
    await page.locator('[data-test="firstName"]').fill('Nicolas');
    await page.locator('[data-test="lastName"]').fill(tooLongLastName);
    
    const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
    
    console.log(`Caracteres inseridos no último nome: ${lastNameValue.length}`);
    
    await page.locator('[data-test="postalCode"]').fill('90265');
    await page.locator('[data-test="continue"]').click();
});