import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';

  test('Pagina de produtos é apresentada após de login', async ({ page }) => {
    
  //Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');
    
  //Verifica se a URL da página de produtos é a esperada
  let endereco = await page.url();
  console.log("Endereço da página de produtos: " + endereco);

  //Verifica se a URL é a correta
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  
});


  test('Os produtos devem ser exibidos com imagem, descrição, detalhes e preço', async ({ page }) => {

  //Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');

  // Verifica se os produtos estão visíveis
  let imagem = await page.locator('.inventory_item_img img').first().getAttribute('src');
  let descricao = await page.locator('.inventory_item_name').first().textContent();
  let descricaoDetalhada = await page.locator('.inventory_item_desc').first().textContent();
  let preco = await page.locator('.inventory_item_price').first().textContent();
  
  // Exibe as informações dos produtos no console
  console.log("Imagem do produto: " + imagem);
  console.log("Descrição do produto: " + descricao);
  console.log("Descrição detalhada do produto: " + descricaoDetalhada);
  console.log("Preço do produto: " + preco);

  // Verifica se as informações dos produtos estão definidas
  await expect(imagem).toBeDefined();
  await expect(descricao).toBeDefined();
  await expect(descricaoDetalhada).toBeDefined();
  await expect(preco).toBeDefined();


});


test('Ao clicar no produto, deve ser exibida sua tela de informações', async ({ page }) => {
 
  // Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');
  
  // Clica no link do produto
   await page.locator('[data-test="item-4-img-link"]').click();

  //guarda o endereço da página do produto
   let enderecoProduto = "https://www.saucedemo.com/inventory-item.html?id=4";

  // Exibe o endereço da página do produto no console
  console.log("Endereço da página do produto: " + enderecoProduto);

  // Verifica se a URL da página do produto é a esperada
   await expect(page).toHaveURL(enderecoProduto);
});


test('Da tela do produto, deve ser possível adicionar e remover itens do carrinho', async ({ page }) => {

  // Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('standard_user', 'secret_sauce');

  // Clica no link do produto
  await page.locator('[data-test="item-4-img-link"]').click();
  // Adiciona o produto ao carrinho
  await page.locator('[data-test="add-to-cart"]').click();
  // remove o produto do carrinho
  await page.locator('[data-test="remove"]').click();

  //guarda o contador de produtos no carrinho
  const badgeLocator = page.locator('.shopping_cart_badge');

  //verifica se o contador de produtos no carrinho é maior que 0
  //se for, exibe a quantidade de produtos no carrinho
  if (await badgeLocator.count() > 0) {
    const produtosNoCarrinho = await badgeLocator.textContent();
    const contadorNumerico = parseInt(produtosNoCarrinho || '0');
    console.log("Você tem: " + contadorNumerico + " produto(s) no carrinho.");
  } else {
    console.log("Você tem: 0 produto(s) no carrinho.");
  }

  // Verifica se o contador de produtos no carrinho é igual a 0
  await expect(badgeLocator).toHaveCount(0);
  console.log("Você removeu o item com sucesso!");
});


test('Pagina de produtos é apresentada após de login - caminho c/erro', async ({ page }) => {
  // Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('locked_out_user', 'secret_sauce');
  
  // Verifica se a URL da página de produtos é a esperada
  await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');

  const erro = page.locator('[data-test="error"]');
  await expect(erro).toBeVisible();
  await expect(erro).toContainText('locked out');

  console.log("Usuário bloqueado impedido de acessar a página de produtos.");
});

test('Os produtos devem ser exibidos com imagem, descrição, detalhes e preço - caminho c/erro', async ({ page }) => {

  // Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('problem_user', 'secret_sauce');

  // pega o primeiro produto da lista
  const produto = page.locator('.inventory_item').first();

  // Localiza os elementos de imagem, nome, descrição e preço do produto
  // usando o seletor apropriado
  const imagem = produto.locator('.inventory_item_img img');
  const nome = produto.locator('.inventory_item_name');
  const descricao = produto.locator('.inventory_item_desc');
  const preco = produto.locator('.inventory_item_price');

  // Pega os valores
  const srcImagem = await imagem.getAttribute('src');
  const textoNome = await nome.textContent();
  const textoDescricao = await descricao.textContent();
  const textoPreco = await preco.textContent();

  //imagem esperada primeiro produto
  const esperado_imagem = {
  'Sauce Labs Backpack': '/static/media/sauce-backpack-1200x1500.34e7aa42.jpg',};

  // Verificações com saída de erro no console se algo estiver inconsistente
 if (!srcImagem || srcImagem.includes('sl-404')) {
    console.log('❌ ERRO: Imagem do produto está quebrada ou inválida:', srcImagem);
  } else if (textoNome && esperado_imagem[textoNome] && srcImagem !== esperado_imagem[textoNome]) {
    console.log(`❌ ERRO: Imagem incorreta para "${textoNome}"`);
    console.log(`Esperado: ${esperado_imagem[textoNome]}`);
    console.log(`Recebido: ${srcImagem}`);
  } else {
    console.log('✅ Imagem OK:', srcImagem);
  }

  // Verifica se o nome está vazio ou inválido
  if (!textoNome || textoNome.trim() === '') {
    console.log('❌ ERRO: Nome do produto está vazio ou inválido.');
  } else {
    console.log('✅ Nome do produto:', textoNome);
  }

  // verifiaca se a descrição está vazia ou inválida
  if (!textoDescricao || textoDescricao.trim() === '') {
    console.log('❌ ERRO: Descrição do produto está vazia.');
  } else {
    console.log('✅ Descrição do produto:', textoDescricao);
  }

  // Verifica se o preço está vazio ou não contém o símbolo de dólar
  if (!textoPreco || !textoPreco.includes('$')) {
    console.log('❌ ERRO: Preço do produto está faltando ou incorreto:', textoPreco);
  } else {
    console.log('✅ Preço do produto:', textoPreco);
  }

  // Espera visualização 
  await expect(imagem).toBeVisible();
  await expect(nome).toBeVisible();
  await expect(descricao).toBeVisible();
  await expect(preco).toBeVisible();
});


test('Ao clicar no produto, deve ser exibida sua tela de informações - caminho c/erro', async ({ page }) => {

  // Acessa a página de login
  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('problem_user', 'secret_sauce');

  // Clica no link do primeiro produto
  const primeiroProduto = page.locator('.inventory_item a').first();

  // pega o href do primeiro produto
  const href = await primeiroProduto.getAttribute('href');
  console.log('Tentando acessar o link do produto:', href);

  // Verifica se o href é válido
  if (!href || href === '#') {
    console.log('❌ ERRO: Link do produto está incorreto (href="#").');
  } else {
    console.log('✅ Link do produto parece válido:', href);
  }

  // Clica no primeiro produto
  await primeiroProduto.click();

  // Verifica se a URL atual é a esperada
  const urlAtual = page.url();
  if (!urlAtual.includes('inventory-item.html')) {
    console.log('❌ ERRO: Navegação falhou. URL atual:', urlAtual);
  } else {
    console.log('✅ Produto abriu corretamente:', urlAtual);
  }

  // Verifica se a URL contém o ID do produto
  await expect(page).toHaveURL(/inventory-item\.html\?id=\d+/);
});

test('Da tela do produto, deve ser possível adicionar e remover itens do carrinho - caminho c/erro', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
   const loginUser = new Logins(page);
   await loginUser.login('problem_user', 'secret_sauce');

 // Clica no produto 
  await page.locator('[data-test="item-4-img-link"]').click();

  // Botões reais
  const botaoAdicionar = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const botaoRemover = page.locator('[data-test="remove-sauce-labs-backpack"]');

  // Tenta adicionar ao carrinho
  if (await botaoAdicionar.isVisible()) {
    await botaoAdicionar.click();
    console.log("✅ Produto foi adicionado (visualmente).");
  } else {
    console.log("❌ ERRO: Botão de adicionar não está visível.");
  }

  // Tenta remover do carrinho
  if (await botaoRemover.isVisible()) {
    await botaoRemover.click();
    console.log("✅ Produto foi removido (visualmente).");
  } else {
    console.log("❌ ERRO: Botão de remover não está visível.");
  }

  // Verifica o número no carrinho
  const badgeLocator = page.locator('.shopping_cart_badge');
  const badgeExiste = await badgeLocator.count() > 0;

  if (badgeExiste) {
    const produtosNoCarrinho = await badgeLocator.textContent();
    const contadorNumerico = parseInt(produtosNoCarrinho || '0');
    console.log("❌ ERRO: Ainda há produto no carrinho: " + contadorNumerico);
  } else {
    console.log("✅ Carrinho está vazio.");
  }

  // Verificação final: o badge *não deveria* existir se o produto foi removido
  await expect(badgeLocator).toHaveCount(0);
});
