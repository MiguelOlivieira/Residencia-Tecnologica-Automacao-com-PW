import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';



test.describe('Filtragem de produtos', () => {
    test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');
    });
test('Filtro de a-z, deve exibir Sauce Labs Backpack ', async ({ page }) => {

  // Espera-se que os itens sejam filtrados de a-z
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  let primeiroProduto = await page.locator('.inventory_item_name').first().textContent();

  console.log("Primeiro produto de a-z: " + primeiroProduto);
   //espera que primeiro produto seja Sauce Labs Backpack
  await expect(primeiroProduto).toBe('Sauce Labs Backpack');

});

test('Filtro de z-a, deve exibir "Test.allTheThings() T-Shirt (Red)"', async ({ page }) => {

   // Espera-se que os itens sejam filtrados de z-a
 await page.locator('[data-test="product-sort-container"]').selectOption('za');
 let primeiroProduto = await page.locator('.inventory_item_name ').first().textContent();

 console.log("Primeiro produto de z-a: " + primeiroProduto);

 //Espera-se que o primeiro produto de a-z seja Test.allTheThings() T-Shirt (Red)'
 await expect(primeiroProduto).toBe('Test.allTheThings() T-Shirt (Red)');
});


test('Filtro do menor para o maior preço, deve exibir "Sauce Labs Onesie" e "7.99" como preço', async ({ page }) => {


  // Espera-se  que os itens sejam filtrados do menor ao maior preço
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 let produtoMaisBarato = await page.locator('.inventory_item_name').first().textContent();
 let menorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (menor preço): " + produtoMaisBarato + " e seu preço: " + menorPreco);

  //Espera que o preço seja 7,99 e que o produto seja o Sauce Labs Onesie
  await expect(menorPreco).toBe('$7.99');
  await expect(produtoMaisBarato).toBe('Sauce Labs Onesie');

});

test('Filtro do maior para menor preço, deve exibir "Sauce Labs Fleece Jacket" e "49.99" como preço', async ({ page }) => {
 

// Espera-se que os itens sejam filtrador do maior ao menor preço.
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
   let produtoMaisCaro = await page.locator('.inventory_item_name').first().textContent();
  let maiorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (maior preço):  " + produtoMaisCaro + " e seu preço: " + maiorPreco);

    //Espera que o preço seja 49,99 e que o produto seja o Sauce Labs Fleece Jacket
   await expect(maiorPreco).toBe('$49.99');
   await expect(produtoMaisCaro).toBe('Sauce Labs Fleece Jacket');

});
});


test.describe('Filtragem de produtos - CAMINHO C/ ERRO', () => { 
    test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('problem_user', 'secret_sauce');
   });
test('Opções do filtro não selecionaveis', async ({ page }) => {

   // seleciona filtro.
   await page.locator('[data-test="product-sort-container"]').selectOption('za');

   // variavel recebe o filtro selecionado.
   let opcaoAtual = await page.locator('span.active_option').textContent();
  
   // espera que não seja o filtro padrão (A-Z). Resultará em erro.
   await expect(opcaoAtual).not.toBe('Name (A to Z)');

});
});
