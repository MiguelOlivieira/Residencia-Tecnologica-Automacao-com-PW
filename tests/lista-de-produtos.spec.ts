import { test, expect } from '@playwright/test';

  test('Pagina de produtos é apresentada após de login', async ({ page }) => {
    
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
    
  let endereco = await page.url();
  console.log("Endereço da página de produtos: " + endereco);
  // Verifica se a URL da página de produtos é a esperada

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
});


  test('Os produtos devem ser exibidos com imagem, descrição, detalhes e preço', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  let imagem = await page.locator('.inventory_item_img img').first().getAttribute('src');
  let descricao = await page.locator('.inventory_item_name').first().textContent();
  let descricaoDetalhada = await page.locator('.inventory_item_desc').first().textContent();
  let preco = await page.locator('.inventory_item_price').first().textContent();

  console.log("Imagem do produto: " + imagem);
  console.log("Descrição do produto: " + descricao);
  console.log("Descrição detalhada do produto: " + descricaoDetalhada);
  console.log("Preço do produto: " + preco);

  await expect(imagem).toBeDefined();
  await expect(descricao).toBeDefined();
  await expect(descricaoDetalhada).toBeDefined();
  await expect(preco).toBeDefined();


});


test('Ao clicar no produto, deve ser exibida sua tela de informações', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

   await page.locator('[data-test="item-4-img-link"]').click();
   let enderecoProduto = "https://www.saucedemo.com/inventory-item.html?id=4";
    console.log("Endereço da página do produto: " + enderecoProduto);

   await expect(page).toHaveURL(enderecoProduto);
});


test('Da tela do produto, deve ser possível adicionar e remover itens do carrinho', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="item-4-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="remove"]').click();

  const badgeLocator = page.locator('.shopping_cart_badge');

  if (await badgeLocator.count() > 0) {
    const produtosNoCarrinho = await badgeLocator.textContent();
    const contadorNumerico = parseInt(produtosNoCarrinho || '0');
    console.log("Você tem: " + contadorNumerico + " produto(s) no carrinho.");
  } else {
    console.log("Você tem: 0 produto(s) no carrinho.");
  }

  await expect(badgeLocator).toHaveCount(0);
  console.log("Você removeu o item com sucesso!");
});


test('Pagina de produtos é apresentada após de login - caminho c/erro', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');

  const erro = page.locator('[data-test="error"]');
  await expect(erro).toBeVisible();
  await expect(erro).toContainText('locked out');

  console.log("Usuário bloqueado impedido de acessar a página de produtos.");
});

test('Os produtos devem ser exibidos com imagem, descrição, detalhes e preço - caminho c/erro', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const imagem = await page.locator('.item_inexistente_img img').first().getAttribute('src');
  const descricao = await page.locator('.nome_invalido').first().textContent();
  const descricaoDetalhada = await page.locator('.desc_errada').first().textContent();
  const preco = await page.locator('.preco_fake').first().textContent();

  console.log("Imagem do produto (esperado erro): " + imagem);
  console.log("Descrição do produto (esperado erro): " + descricao);
  console.log("Descrição detalhada (esperado erro): " + descricaoDetalhada);
  console.log("Preço do produto (esperado erro): " + preco);

  await expect(imagem).toBeDefined();
  await expect(descricao).toBeDefined();
  await expect(descricaoDetalhada).toBeDefined();
  await expect(preco).toBeDefined();
});


test('Ao clicar no produto, deve ser exibida sua tela de informações - caminho c/erro', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="item-999-img-link"]').click();

  const enderecoProduto = 'https://www.saucedemo.com/inventory-item.html?id=999';
  console.log("Tentando acessar endereço inválido do produto: " + enderecoProduto);

  await expect(page).not.toHaveURL(enderecoProduto);
});

test('Da tela do produto, deve ser possível adicionar e remover itens do carrinho - caminho c/erro', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await page.locator('[data-test="item-4-img-link"]').click();

  await page.locator('[data-test="adicionar-invalido"]').click();
  await page.locator('[data-test="remover-invalido"]').click();

  const badgeLocator = page.locator('.shopping_cart_badge');

  if (await badgeLocator.count() > 0) {
    const produtosNoCarrinho = await badgeLocator.textContent();
    const contadorNumerico = parseInt(produtosNoCarrinho || '0');
    console.log("Você tem: " + contadorNumerico + " produto(s) no carrinho.");
  } else {
    console.log("Você tem: 0 produto(s) no carrinho.");
  }

  await expect(badgeLocator).not.toHaveCount(0);
  console.log("Falha esperada: item não foi adicionado/removido corretamente.");
});