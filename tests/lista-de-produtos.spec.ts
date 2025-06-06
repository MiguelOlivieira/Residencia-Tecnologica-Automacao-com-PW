/**
* Lista de Produtos (US-001)
*
*  Aluno responsável:  Leonardo Antônio
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';


test.describe.only('Lista de produtos', () => {
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
});


test.describe('Lista de produtos - CAMINHOS C/ ERRO', () => {
  test('Pagina de produtos é apresentada após de login - caminho c/erro', async ({ page }) => {
    // Acessa a página de login
    await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('locked_out_user', 'secret_sauce');


    const erro = page.locator('[data-test="error"]');
    if (await erro.isVisible()) {
      console.log("Usuário bloqueado impedido de acessar a página de produtos.");
    }
    await expect(erro).not.toContainText('locked out');
    // Verifica se a URL da página de produtos é a esperada
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


  });

  test.describe('Os produtos devem ser exibidos com imagem, descrição, detalhes e preço - caminho c/erro', () => {
    test('Os produtos devem ser exibidos com imagem - caminho c/erro', async ({ page }) => {
      // Acessa a página de login
      await page.goto('https://www.saucedemo.com/');
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      // pega o primeiro produto da lista
      await page.locator('#item_5_title_link').click();

      // Localiza o elementos de imagem do produto
      const imagem = page.locator('.inventory_details_img_container img'); //

      // Recebe texto alt da imagem, para verificação
      const textoAlternativoImagem = await imagem.getAttribute('alt')


      //verifica se o texto alt é exatamente o de erro, se for, falhará.

      await expect(textoAlternativoImagem).not.toBe('ITEM NOT FOUND');

    });
    test('Os produtos devem ser exibidos com descrição - caminho c/erro', async ({ page }) => {
      // Acessa a página de login
      await page.goto('https://www.saucedemo.com/');
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      // pega o primeiro produto da lista
      await page.locator('#item_5_title_link').click();

      // Localiza o elementos de descrição do produto
      const descricao = page.locator('.inventory_details_desc');

      // Descrição esperada recebe descrição atual
      const descricaoEsperada = await descricao.textContent();

      // Verifica se descrição esperada não contém texto inválido
      await expect(descricaoEsperada).not.toContain("We're sorry, but your call could not be completed as dialled.");

    });

    test('Os produtos devem ser exibidos com nome - caminho c/erro', async ({ page }) => {
      // Acessa a página de login
      await page.goto('https://www.saucedemo.com/');
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      // pega o primeiro produto da lista
      await page.locator('#item_5_title_link').click();

      // Localiza o elemento de  nome do produto
      const nome = page.locator('.inventory_details_name');

      // nome esperado recebe nome atual
      const nomeEsperado = await nome.textContent();

      // Verifica se nome esperado não contém nome inválido/inexistente;
      await expect(nomeEsperado).not.toBe('ITEM NOT FOUND');

    });

    test('Os produtos devem ser exibidos com preço - caminho c/erro', async ({ page }) => {
      // Acessa a página de login
      await page.goto('https://www.saucedemo.com/');
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      // pega o primeiro produto da lista
      await page.locator('#item_5_title_link').click();

      // Localiza o elemento  de preço do produto
      const preco = page.locator('.inventory_details_price');

      // Preço esperado recebe preço atual
      const precoEsperado = await preco.textContent();

      // Verifica se nome esperado não contém valor inválido/inexistente;
      await expect(precoEsperado).not.toContain("$√-1");

    });

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
      console.log('ERRO: Link do produto está incorreto (href="#").');
    }

    // Clica no primeiro produto
    await primeiroProduto.click();

    // verifica se a URL atual é a esperada
    const urlAtual = page.url();
    if (!urlAtual.includes('inventory-item.html')) {
      console.log('ERRO: Navegação falhou. URL atual:', urlAtual);
    }

    // Verifica se a URL contém o ID do produto
    await expect(page).not.toHaveURL(/inventory-item\.html\?id=\d+/);
  });

  test('Da tela do produto, deve ser possível adicionar e remover itens do carrinho - caminho c/erro', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    const loginUser = new Logins(page);
    await loginUser.login('problem_user', 'secret_sauce');

    // Clica no produto 
    await page.locator('[data-test="item-4-title-link"]').click();

    // Botões reais
    const botaoAdicionar = page.locator('[data-test="add-to-cart"]');
    const botaoRemover = page.locator('[data-test="remove"]');
    //const botaoRemover =  page.locator('[data-test="remove"]');
    // Verifica o número no carrinho
    const badgeLocator = page.locator('.shopping_cart_badge');

    // adiciona ao carrinho
    await botaoAdicionar.click();
    if (await badgeLocator.count() === 0) {
      console.log("\nERRO: Não foi possível produto adicionar ao carrinho")
    }

    if (await botaoRemover.isVisible()) {
      await botaoRemover.click()
      console.log("O item foi removido ")
    } else {
      console.log("\nERRO: Botão de remover não está visível. Não foi possível remover o produto");
    }

    const badgeExiste = await badgeLocator.count() > 0;

    if (badgeExiste) {
      const produtosNoCarrinho = await badgeLocator.textContent();
      const contadorNumerico = parseInt(produtosNoCarrinho || '0');
      console.log(" ERRO: Ainda há produto no carrinho: " + contadorNumerico);
    } else {
      console.log("Carrinho está vazio.");
    }

    // Espera-se que o badge (contador) seja diferente de 0. Como não é, falhará.
    await expect(badgeLocator).not.toHaveCount(0);
  });
});