/**
* Carrinho de compras (US-003)
*
*  Aluno responsável:  Emmanuel Guerra Maranhão
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

//*Teste 01: Adiciona o primeiro
test('GerenciamentoDoCarrinhoExpected', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  //Login na conta 
   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');

  //Adicionar produto ao carrinho estando no menu principal
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  let contador = await page.locator('.shopping_cart_badge');
  let textoContador = await contador.textContent();
  let produtosNoCarrinho = parseInt(textoContador || '0');
  //Recebe a quantidade de produtos no carrinho

  console.log("Você tem: "+produtosNoCarrinho+" produto(s) no carrinho.");
  //Mostra no console a quantidade de produtos no ho

  //Remover o produto no menu principal
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  //Valida se a remoção de produto foi bem sucedida

  console.log("Você removeu o item com sucesso!");
  
});

//Emmanuel Guerra e Miguel Vieira
test('Exibição de produtos selecionados no carrinho', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');

   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');


   //Seleciona dois produtos
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Variaveis inicializadas com os produtos para futura comparação
    const nome1Esperado = 'Sauce Labs Backpack';
    const desc1Esperada = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
    const preco1Esperado = '$29.99';

    const nome2Esperado = 'Sauce Labs Bike Light';
    const desc2Esperada = "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
    const preco2Esperado = '$9.99';
    //

    //Recebe informações do primeiro produto no carrinho
   let nomeProduto1 = await page
                            .locator('.inventory_item_name')
                            .first()
                            .textContent();
                            
   let descProduto1 = await page
                            .locator('.inventory_item_desc')
                            .first()
                            .textContent();

   let precoProduto1 = await page
                            .locator('.inventory_item_price')
                            .first()
                            .textContent();
  //

  //Recebe informações do segundo produto no carrinho
   let nomeProduto2 = await page
                            .locator('.inventory_item_name')
                            .nth(1)
                            .textContent();

   let descProduto2 = await page
 
                            .locator('.inventory_item_desc')
                            .nth(1)
                            .textContent();

   let precoProduto2 = await page
                            .locator('.inventory_item_price')
                            .nth(1)
                            .textContent();
//

   console.log(`\nNome do produto 1: "${nomeProduto1}"\n 
                Desc do produto 1: "${descProduto1}"\n 
                Preço do produto 1: "${precoProduto1}" `);




   console.log(`\nNome do produto 2: "${nomeProduto2}"\n 
                Desc do produto 2: "${descProduto2}"\n 
                Preço do produto 2: "${precoProduto2}" `);



  //Espera-se que os nomes e preços sejam exibidos corretamente.
   expect([nomeProduto1, descProduto1, precoProduto1]).toEqual([nome1Esperado, desc1Esperada, preco1Esperado]);

   expect([nomeProduto2, descProduto2, precoProduto2]).toEqual([nome2Esperado, desc2Esperada, preco2Esperado]);
   




});

//Emmanuel Guerra e Miguel Vieira
test('Remoção de item diretamente do carrinho', async ({page}) => {
  await page.goto('https://www.saucedemo.com/');

   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    
  //Remover o produto no carrinho
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  //Valida se a remoção de produto foi bem sucedida

  console.log("Você removeu o item com sucesso!");

});


//TO DO 
test('Alterar quantidade de produtos e limitar a 99', async ({page}) => {

});

//Emmanuel Guerra e Miguel Vieira
test('Seguir com compra após clicar no botão Checkout', async ({page}) => {
 await page.goto('https://www.saucedemo.com/');

   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');

   const enderecoEsperado = "https://www.saucedemo.com/checkout-step-one.html";

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();
    
    await page.locator('#checkout').click();

     //Espera-se que a URL Após clicar em checkout, seja a URL correta.
    await expect(page).toHaveURL(enderecoEsperado);

    console.log("Checkout acessado com sucesso!")



});



// TO DO
test('Voltar a tela de produtos após clicar em "continue shopping" ', async ({page}) => {

  
});

test('GerenciamentoDoCarrinhoError', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  //Login na conta 
   const loginUser = new Logins(page);
   await loginUser.login('problem_user', 'secret_sauce');


  //Adicionar produto ao carrinho estando no menu principal
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  let contador = await page.locator('.shopping_cart_link');
  let textoContador = await contador.textContent();

  let produtosNoCarrinho = parseInt(textoContador || '0');//converte a string textoContador para um int e caso seja null,retorna 0.

  console.log("Você tem: "+produtosNoCarrinho+" produto(s) no carrinho.");
  //Mostra no console a quantidade de produtos no carrinho


  //Remover o produto no menu principal
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  //Valida se a remoção de produto foi bem sucedida

});