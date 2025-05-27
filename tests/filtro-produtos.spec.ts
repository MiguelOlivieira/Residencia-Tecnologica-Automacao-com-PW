import { test, expect } from '@playwright/test';


test('Filtro de a-z, deve exibir Sauce Labs Backpack ', async ({ page }) => {

// Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();


  // Espera-se que os itens sejam filtrados de a-z
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  let primeiroProduto = await page.locator('.inventory_item_name').first().textContent();

  console.log("Primeiro produto de a-z: " + primeiroProduto);
   //espera que primeiro produto seja Sauce Labs Backpack
  await expect(primeiroProduto).toBe('Sauce Labs Backpack');

});

test('Filtro de z-a, deve exibir "Test.allTheThings() T-Shirt (Red)"', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
    
   // Espera-se que os itens sejam filtrados de z-a
 await page.locator('[data-test="product-sort-container"]').selectOption('za');
 let ultimoProduto = await page.locator('.inventory_item_name ').first().textContent();

 console.log("Primeiro produto de z-a: " + ultimoProduto);

 await expect(ultimoProduto).toBe('Test.allTheThings() T-Shirt (Red)');
});


test('Filtro do menor para o maior preço, deve exibir "Sauce Labs Onesie" e "7.99" como preço', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Espera-se  que os itens sejam filtrados do menor ao maior preço
 await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
 let produtoMaisBarato = await page.locator('.inventory_item_name').first().textContent();
 let menorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (menor preço): " + produtoMaisBarato + " e seu preço: " + menorPreco);

  await expect(menorPreco).toBe('$7.99');
  await expect(produtoMaisBarato).toBe('Sauce Labs Onesie');

});

test('Filtro do maior para menor preço, deve exibir "Sauce Labs Fleece Jacket" e "49.99" como preço', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

// Espera-se que os itens sejam filtrador do maior ao menor preço.
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
   let produtoMaisCaro = await page.locator('.inventory_item_name').first().textContent();
  let maiorPreco = await page.locator('.inventory_item_price').first().textContent();

  console.log("O primeiro produto (maior preço):  " + produtoMaisCaro + " e seu preço: " + maiorPreco);

   await expect(maiorPreco).toBe('$49.99');
   await expect(produtoMaisCaro).toBe('Sauce Labs Fleece Jacket');

});

