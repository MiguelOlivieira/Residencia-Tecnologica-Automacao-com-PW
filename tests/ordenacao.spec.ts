/**
* Ordenação (US-002)

*
*  Aluno responsável:  José Miguel Vieira Oliveira
*/


import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';



/* TESTE 01: Os produtos podem ser ordenados a partir de 4 opções de ordenação:
* Name (A to Z): Ordena os produtos por nome em ordem crescente (A to Z)
* Name (Z to A): Ordena os produtos por nome em ordem decrescente (Z to A)
* Price (low to high): Ordenar os produtos do menor preço para o maior preço
* Price (high to low): Ordenar os produtos do maior preço para o menor preço
*/

test.describe.only('Filtragem de produtos', () => {
    test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce'); //loga com user padrão
    });
test('Teste Filtro de a-z', async ({ page }) => {

  // Espera-se que os itens sejam filtrados de a-z
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  let primeiroProduto = await page.locator('.inventory_item_name').first().textContent();

  console.log("Primeiro produto de a-z: " + primeiroProduto);
   //Espera que primeiro produto seja Sauce Labs Backpack
  await expect(primeiroProduto).toBe('Sauce Labs Backpack');

});

test('Teste Filtro de z-a', async ({ page }) => {

   //Espera-se que os itens sejam filtrados de z-a
 await page.locator('[data-test="product-sort-container"]').selectOption('za');
 let primeiroProduto = await page.locator('.inventory_item_name ').first().textContent();

 console.log("Primeiro produto de z-a: " + primeiroProduto);

 //Espera-se que o primeiro produto de a-z seja Test.allTheThings() T-Shirt (Red)'
 await expect(primeiroProduto).toBe('Test.allTheThings() T-Shirt (Red)');
});


test('Teste Filtro do menor para o maior preço', async ({ page }) => {


  //Espera-se  que os itens sejam filtrados do menor ao maior preço
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 let produtoMaisBarato = await page.locator('.inventory_item_name').first().textContent();
 let menorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (menor preço): " + produtoMaisBarato + " e seu preço: " + menorPreco);

  //Espera que o preço seja 7,99 e que o produto seja o Sauce Labs Onesie
  await expect(menorPreco).toBe('$7.99');
  await expect(produtoMaisBarato).toBe('Sauce Labs Onesie');

});

test('Teste Filtro do maior para menor preço', async ({ page }) => {
 

//Espera-se que os itens sejam filtrador do maior ao menor preço.

  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
   let produtoMaisCaro = await page.locator('.inventory_item_name').first().textContent();
  let maiorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (maior preço):  " + produtoMaisCaro + " e seu preço: " + maiorPreco);

    //Espera que o preço seja 49,99 e que o produto seja o Sauce Labs Fleece Jacket
   await expect(maiorPreco).toBe('$49.99');
   await expect(produtoMaisCaro).toBe('Sauce Labs Fleece Jacket');

});


//Teste - Apenas 1 opção de ordenação pode ser selecionada por vez
test('Em caso de seleção multipla de filtros, apenas o primeiro será selecionado', async  ({page}) => {


  //Seleção de multiplos filtros
   await page.locator('[data-test="product-sort-container"]').selectOption(['za', 'lohi']);

  let opcaoAtual = await page.locator('span.active_option').textContent();

  //Garantia de que apenas o primeiro selecionado seja carregado.
  await expect(opcaoAtual).toBe('Name (Z to A)');

});
});



//Caminhos de erro do Teste 01
test.describe('Filtragem de produtos - CAMINHOS C/ ERRO', () => { 
  
//
test('Opções do filtro não selecionaveis', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('standard', 'secret_sauce');
   //Seleciona filtro.
   await page.locator('[data-test="product-sort-container"]').selectOption('za');

   //Variavel recebe o filtro selecionado.
   let opcaoAtual = await page.locator('span.active_option').textContent();
  
   //Espera que não seja o filtro padrão (A-Z). Resultará em erro.
   await expect(opcaoAtual).not.toBe('Name (A to Z)');

});

test('Seleção de 2 filtros ao mesmo tempo - CAMINHO C/ ERRO', async  ({page}) => {

  await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    //Multiplos filtros selecionados ao mesmo tempo
   await page.locator('[data-test="product-sort-container"]').selectOption(['za', 'lohi']);

  let opcaoAtual = await page.locator('span.active_option').textContent();

  console.log("Filtro atual : " + opcaoAtual)
  //Uma vez que a seleção de multiplos filtros vai contra a logica do site, espera-se que de erro.
  await expect(opcaoAtual).toBe(['Name (Z to A)', 'Price (low to high)']);

});

test('Filtragem quebrada/indisponível', async({ page }) => {
 await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('error_user', 'secret_sauce');



    //Verifica o alerta de erro ao clicar em algum filtro
    page.on('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);

    //Caso apareça mensagem de erro
        if(dialog.message().includes("Sorting is broken!")) {
      console.log("O filtro está quebrado!");
    }

    // Verifica se o alert não contém o texto de erro. Como contém, falhará.
    expect(dialog.message()).not.toContain('Sorting is broken!');
    dialog.dismiss().catch(() => {}); //fecha o alert
  });

  await page.locator('[data-test="product-sort-container"]').selectOption('za');

 

});

     
});
