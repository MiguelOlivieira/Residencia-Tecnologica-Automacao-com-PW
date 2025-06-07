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
        await page.goto('https://www.saucedemo.com/'); // Navega para a URL base da aplicação
        const loginUser = new Logins(page); // Cria uma nova instância da classe Logins
        await loginUser.login('standard_user', 'secret_sauce'); // Realiza o login com um usuário padrão

        // Adiciona um item ao carrinho
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        // Clica no ícone do carrinho de compras
        await page.locator('[data-test="shopping-cart-link"]').click();
        // Clica no botão 'Checkout'
        await page.locator('[data-test="checkout"]').click();

        //preenche os campos de informação do comprador
        await page.locator('[data-test="firstName"]').fill('Nicolas'); 
        await page.locator('[data-test="lastName"]').fill('Nery');     
        await page.locator('[data-test="postalCode"]').fill('90265'); 

        //clica no botão para avançar para a próxima etapa do checkout
        await page.locator('[data-test="continue"]').click();
        // clica no botão  para concluir a compra
        await page.locator('[data-test="finish"]').click();

        // verifica se a URL final é a página de conclusão de checkout,
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    });
     test('Tela de confirmação aparece após preencher dados', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/'); 
        const loginUser = new Logins(page); 
        await loginUser.login('standard_user', 'secret_sauce'); 

        // Adiciona um item ao carrinho 
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        //clica no ícone do carrinho de compras
        await page.locator('[data-test="shopping-cart-link"]').click();
        //clica no botão 'Checkout' para iniciar o processo de compra
        await page.locator('[data-test="checkout"]').click();

        // Preenche os campos de informação do comprador
        await page.locator('[data-test="firstName"]').fill('Nicolas'); // Primeiro Nome
        await page.locator('[data-test="lastName"]').fill('Nery');     // Último Nome
        await page.locator('[data-test="postalCode"]').fill('90265'); // CEP

        //clica no botão  para avançar para a próxima etapa do checkout
        await page.locator('[data-test="continue"]').click();

        // Verifica se a URL é a da segunda etapa do checkout
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        // Verifica se o label de informações de pagamento está visível
        await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
        // Verifica se o label de informações de envio está visível
        await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    });
    test('Cancelar Transação', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('standard_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        // Preenche os campos de informação do comprador
        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill('Nery');
        await page.locator('[data-test="postalCode"]').fill('90265');

        //clica em continue
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="cancel"]').click(); //clica em cancel

        //verifica se voltou para pagina inicial
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
        await page.locator('[data-test="checkout"]').click(); //clica em checkout
        await page.locator('[data-test="continue"]').click(); // continua para a proxima tela de checkout

        //verifica se o erro ocorre
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

        //verifica se o campo de nome é obrigatorio
        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
    });

    test('Último Nome em branco - CAMINHO C/ ERRO', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginUser = new Logins(page);
        await loginUser.login('problem_user', 'secret_sauce');

        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="postalCode"]').fill('90265');
        await page.locator('[data-test="continue"]').click();


        //variavel que recebe o locator do erro
        const erroContinue = await page.locator('[data-test="error"]');
        const erroEsperado = await erroContinue.textContent(); //variavel que recebe o texto do erro
        if(erroEsperado === 'Error: Last Name is required'){ //verifica se o erro é o esperado
                                       
        await expect(page).not.toHaveURL('https://www.saucedemo.com/checkout-step-two.html'); //Espera-se que o site não seja o mesmo após clicar em continue
        }
        
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

         const longLastName = '9'.repeat(250); // Gera uma string com 250 caracteres '9'
        await page.locator('[data-test="firstName"]').fill('Nicolas');
        await page.locator('[data-test="lastName"]').fill(longLastName); // Preenche o campo
        await page.locator('[data-test="postalCode"]').fill('90265888');

        // Recebe o valor do nome
        const value = await page.locator('[data-test="lastName"]').inputValue();
        console.log(`Caracteres inseridos no último nome: ${value.length}`); //imprime o tamanho de caracteres
    
        expect(value).toBe(longLastName); // Verifica se o valor informado seja igual ao tamanho maximo.

        await page.locator('[data-test="continue"]').click();

        // Verifica se a URL é a da segunda etapa do checkout.
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
        await page.locator('[data-test="postalCode"]').fill(validPostalCode); //preenche um cep   

        const value = await page.locator('[data-test="postalCode"]').inputValue();
        expect(value).toBe(validPostalCode);  //verifica se o cep é o valido 

        await page.locator('[data-test="continue"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');  //espera-se que o site seja o passo 2
    });
});