import { test, expect } from '@playwright/test';
import { log } from 'console';
import { Logins } from '../users/logins';

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
  //Mostra no console a quantidade de produtos no carrinho

  //Remover o produto no menu principal
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  //Valida se a remoção de produto foi bem sucedida

  console.log("Você removeu o item com sucesso!");
  
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