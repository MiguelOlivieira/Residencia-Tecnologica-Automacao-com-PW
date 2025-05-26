import { test, expect } from '@playwright/test';


//LEMBREM-SE DE SEPARA OS TESTES! Este Abaixo é o de filtragem de produtos!
test('Filtro de produtos', async ({ page }) => {


  await page.goto('https://www.saucedemo.com/');

  //login (é obrigatorio em todos testes, uma vez que precisamos estar logados para a maquina fazer os testes automatizados)
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();



  //testa se o filtro de 'a-z' está correto
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    let primeiroItem = await page.locator('.inventory_item_name').first().textContent(); //pega a primeira div "inventory_item_name" e o seu texto.

    console.log("O primeiro item é: " + primeiroItem); //printa no console para uma verificação manual

    //verifica se a variavel, primeiroItem, é igual ao texto "Sauce Labs Backpack" (que é o primeiro item de a-z)
    await expect(primeiroItem).toBe('Sauce Labs Backpack'); //a validação de fato, aqui é onde o teste pode falhar, ou passar.


//testa se o filtro de 'z-a' está correto
   await page.locator('[data-test="product-sort-container"]').selectOption('za');
   let ultimoItem = await page.locator('.inventory_item_name').first().textContent();

    console.log("O último item é: " + ultimoItem);

    await expect(ultimoItem).toBe('Test.allTheThings() T-Shirt (Red)');
//

//testa se o filtro 'Price (low to high)' está funcionando
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  let itemMaisBarato = await page.locator('.inventory_item_name').first().textContent();

  console.log("O item mais barato é: " + itemMaisBarato);
  await expect(itemMaisBarato).toBe('Sauce Labs Onesie');
//

// testa se o filtro 'Price (high to low)' está funcionando
await page.locator('[data-test="product-sort-container"]').selectOption('hilo')
let itemMaisCaro = await page.locator('.inventory_item_name').first().textContent();

console.log("O item mais caro é: " + itemMaisCaro);
await expect(itemMaisCaro).toBe('Sauce Labs Fleece Jacket');
//

});


//Emmanuel
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

/*test('Page dos Produtos', async ({ page }) => {


}*/