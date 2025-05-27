import { test, expect } from '@playwright/test';

test('GerenciamentoDoCarrinho', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  //Login na conta 
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //Adicionar produto ao carrinho estando no menu principal
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  let produtosNoCarrinho = await page.locator('.shopping_cart_link').textContent();
  //Recebe a quantidade de produtos no carrinho

  console.log("Você tem: "+produtosNoCarrinho+" produto(s) no carrinho.");
  //Mostra no console a quantidade de produtos no carrinho

  //Remover o produto no menu principal
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await expect(produtosNoCarrinho).toBe(produtosNoCarrinho-1);
  //Valida se a remoção de produto foi bem sucedida

});