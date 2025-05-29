import { test, expect } from '@playwright/test';



test.describe('Filtragem de produtos', () => {
    test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
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
 let ultimoProduto = await page.locator('.inventory_item_name ').first().textContent();

 console.log("Primeiro produto de z-a: " + ultimoProduto);

 await expect(ultimoProduto).toBe('Test.allTheThings() T-Shirt (Red)');
});


test('Filtro do menor para o maior preço, deve exibir "Sauce Labs Onesie" e "7.99" como preço', async ({ page }) => {


  // Espera-se  que os itens sejam filtrados do menor ao maior preço
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 let produtoMaisBarato = await page.locator('.inventory_item_name').first().textContent();
 let menorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (menor preço): " + produtoMaisBarato + " e seu preço: " + menorPreco);

  await expect(menorPreco).toBe('$7.99');
  await expect(produtoMaisBarato).toBe('Sauce Labs Onesie');

});

test('Filtro do maior para menor preço, deve exibir "Sauce Labs Fleece Jacket" e "49.99" como preço', async ({ page }) => {
 

// Espera-se que os itens sejam filtrador do maior ao menor preço.
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
   let produtoMaisCaro = await page.locator('.inventory_item_name').first().textContent();
  let maiorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (maior preço):  " + produtoMaisCaro + " e seu preço: " + maiorPreco);

   await expect(maiorPreco).toBe('$49.99');
   await expect(produtoMaisCaro).toBe('Sauce Labs Fleece Jacket');

});
});


test.describe('Filtragem de produtos - CAMINHO C/ ERRO', () => { 
    test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
   });
test('Opções do filtro não selecionaveis', async ({ page }) => {

   // seleciona filtro.
   await page.locator('[data-test="product-sort-container"]').selectOption('za');

   // recebe opção selecionada.
   let opcaoAtual = await page.locator('span.active_option').textContent();
  
   // espera que não seja o filtro inicial.
   await expect(opcaoAtual).not.toBe('Name (A to Z)');

});
});

