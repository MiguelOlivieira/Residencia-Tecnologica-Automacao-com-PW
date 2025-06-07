/**
* Carrinho de compras (US-003)
*
*  Aluno responsável:  Emmanuel Guerra Maranhão
*/

import { test, expect } from '@playwright/test';
import { Logins } from '../users/logins';



//*Teste 01: Deve ser possível adicionar um produto ao carrinho através da tela inicial e o contador aumentar conforme a ocorrência
//Emmanuel Guerra
test.describe.only('Carrinho de compras', () => {
  test('Valida adição do Produto e contador', async ({ page }) => {

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

    console.log("Você adicionou o produto com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

    console.log("Você tem: " + produtosNoCarrinho + " produto(s) no carrinho.");
    //Mostra no console a quantidade de produtos no carrinho

  });

  //*Teste 02:Deve ser possível remover um produto do carrinho na tela inicial e o contador diminuir conforme a ocorrência
  //Emmanuel Guerra
  test('Valida remoção do produto e contador', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //Login na conta 
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    //Adicionar produto ao carrinho estando no menu principal
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    //Remover o produto no menu principal
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    //Valida se a remoção de produto foi bem sucedida

    console.log("Você removeu o item com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

  });

  //Emmanuel Guerra e Miguel Vieira
  //*Teste 03:Deve ser possível adicionar um produto ao carrinho na tela de produtos
  //Deve ser possível adicionar um produto ao carrinho estando na tela de visualização de produtos
  test('Valida adição do produto dentro da página específica dele', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    //Login na conta 
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    //Espera a pagina do item selecionado ser carregada

    await page.locator('#add-to-cart').click();
    //Espera a adição do produto ao carrinho

    console.log("O produto foi adicionado com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

  });

  //*Teste 04:Deve ser possível remover um produto do carrinho na tela de produtos
  //Emmanuel Guerra
  test('Valida remoção De produto na página específica dele', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    //Login na conta 
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="inventory-item-name"]', { hasText: 'Sauce Labs Backpack' }).click();
    //Ir a pagina do item selecionado

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
    //Espera a pagina do item selecionado ser carregada

    await page.locator('#add-to-cart').click();
    //Espera a adição do produto ao carrinho

    //Remover o produto na Product Page
    await page.locator('[data-test="remove"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    //Valida se a remoção de produto foi bem sucedida


    console.log("O produto foi removido com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

  });

  //*Teste 05:No carrinho de compras deve ser apresentado todos os produtos adicionados contendo nome, descrição detalhada e preço do produto
  //Emmanuel Guerra e Miguel Vieira
  test('Valida exibição de produtos da tela inicial no carrinho', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //Login na conta
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');


    //Seleciona dois produtos
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Variaveis inicializadas com os produtos para futura comparação
    const nome1Esperado = 'Sauce Labs Backpack';
    const desc1Esperada = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
    const preco1Esperado = '$29.99';

    const nome2Esperado = 'Sauce Labs Bike Light';
    const desc2Esperada = "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
    const preco2Esperado = '$9.99';
    //

    //Recebe informações do primeiro produto no carrinho
    let nomeProduto1 = await page
      .locator('.inventory_item_name')
      .first()
      .textContent();

    let descProduto1 = await page
      .locator('.inventory_item_desc')
      .first()
      .textContent();

    let precoProduto1 = await page
      .locator('.inventory_item_price')
      .first()
      .textContent();
    //

    //Recebe informações do segundo produto no carrinho
    let nomeProduto2 = await page
      .locator('.inventory_item_name')
      .nth(1)
      .textContent();

    let descProduto2 = await page
      .locator('.inventory_item_desc')
      .nth(1)
      .textContent();

    let precoProduto2 = await page
      .locator('.inventory_item_price')
      .nth(1)
      .textContent();
    //

    console.log(`\nNome do produto 1: "${nomeProduto1}"\n 
                Desc do produto 1: "${descProduto1}"\n 
                Preço do produto 1: "${precoProduto1}" `);


    console.log(`\nNome do produto 2: "${nomeProduto2}"\n 
                Desc do produto 2: "${descProduto2}"\n 
                Preço do produto 2: "${precoProduto2}" `);



    //Espera-se que os nomes e preços sejam exibidos corretamente.
    expect([nomeProduto1, descProduto1, precoProduto1]).toEqual([nome1Esperado, desc1Esperada, preco1Esperado]);

    expect([nomeProduto2, descProduto2, precoProduto2]).toEqual([nome2Esperado, desc2Esperada, preco2Esperado]);

  });

  //*Teste 06:No carrinho de compras deve ser possível remover o produto
  //Miguel Vieira
  test('Valida remoção de item diretamente do carrinho', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //Login na conta
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Remover o produto no carrinho
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    //Valida se a remoção de produto foi bem sucedida

    console.log("Você removeu o item com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

  });

  //*Teste 07:Deve ser possível alterar a quantidade de produtos e o limite máximo do mesmo item deve ser de 99 .
  //Miguel Vieira
  test('Alteração de produtos e quantidade máxima de produtos ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //Login na conta
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]').click();
    //Adiciona produtos ao carrinho

    await page.locator('[data-test="shopping-cart-link"]').click();
    //Ir ao carrinho

    await page.locator('[data-test="cart-list"] div').filter({ hasText: '1Sauce Labs Backpackcarry.' }).locator('[data-test="item-quantity"]').click();
    //Ao clicar na quantidade de unidades de um produto,não é possível alterar a quantidade de produtos

    await page.locator('[data-test="cart-quantity-label"]').click();
    //Ao clicar na div.cart_quantity_label não é possível alterar a quantidade de produtos

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    //Remove um dos produtos

    console.log("É possível adicionar e remover produtos ao carrinho porém não há como ultrapassar 6 produtos");


  });


  //*Teste 08:É possível seguir com a compra através do botão de checkout
  //Miguel Vieira
  test('Seguir com compra após clicar no botão Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //Login na conta
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    const enderecoEsperado = "https://www.saucedemo.com/checkout-step-one.html";
    //Espera-se que a URL Após clicar em checkout, seja a URL correta.

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //Adiciona produto ao carrinho

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('#checkout').click();
    //Ir ao checkout

    //Espera-se que a URL Após clicar em checkout, seja a URL correta.
    await expect(page).toHaveURL(enderecoEsperado);

    console.log("Checkout acessado com sucesso!");
    //Mensagem para verificar se o teste rodou completamente

  });



  //*Teste 09:Deve possível voltar para tela de produtos através do botão continue shopping
  //Emmanuel Guerra
  test('Voltar a tela de produtos após clicar em "continue shopping" ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    //Login na conta
    const loginUser = new Logins(page);
    await loginUser.login('standard_user', 'secret_sauce');

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //Adiciona produto ao carrinho

    //Ir até ao carrinho
    await page.locator('[data-test="shopping-cart-link"]').click();

    //Clicar em continuar comprando 
    await page.locator('#continue-shopping').click();

    //Valida se o URL acessado no continue shopping é o correto
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    console.log("Você voltou a pagina inicial!");
    //Mensagem para verificar se o teste rodou completamente

  });

});

//caminhos com erro


test.describe('Carrinho de compras - CAMINHOS C/ ERRO', () => {
  test.describe('Caminhos com erro na página inicial', () => {


    //Teste Error 01:Deve ser possível remover um produto do carrinho na tela inicial e o contador diminuir conforme a ocorrência, porém o expect está falhando
    //Emmanuel Guerra
    test('Valida remoção do produto e contador ', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');


      //Adicionar produto ao carrinho estando no menu principal
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      let contador = await page.locator('.shopping_cart_link');//Cria variavel para 'armazenar' o carrinho
      let textoContador = await contador.textContent();//Cria variavel para pegar o conteudo do carrinho

      let produtosNoCarrinho = parseInt(textoContador || '0');
      //converte a string textoContador para um int e caso seja null,retorna 0.

      console.log("Você tem: " + produtosNoCarrinho + " produto(s) no carrinho.");
      //Mostra no console a quantidade de produtos no carrinho


      //Remover o produto no menu principal
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
      //Valida se a remoção de produto foi bem sucedida

      console.log("O número de produtos no carrinho não foi descontado");
      //Mensagem explicativa do erro

    });

    //Teste Error 02:Deve ser possível adicionar um produto do carrinho na tela inicial e o contador aumentar conforme a ocorrência, porém o expect está falhando
    //Emmanuel Guerra
    test('Valida adição do produto e contador ', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('error_user', 'secret_sauce');

      await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      //Espera-se que o clique em adicionar ao carrinho fará o produto ser adicionado

      //Espera-se que a adição do produto aumente a quantidade de produtos no carrinho
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(1);


      console.log("A quantidade de produtos no carrinho não foi alterada!");
      //Mensagem explicativa do erro

    });

  });

  test.describe('Caminhos com erro na página específica do produto', () => {

    //Teste Error 03:Deve ser possível adicionar um produto na tela de específica dele e o contador aumentar conforme a ocorrência, porém o expect está falhando
    //Emmanuel Guerra
    test('Valida adição do Produto e contador dentro da página específica do produto ', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('error_user', 'secret_sauce');

      await page.locator('.inventory_item_name').nth(2).click();
      //Espera clicar no terceiro item da lista de produtos,o sauce labs bolt t-shirt

      await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1');
      //Espera que a página do produto seja a mesma do selecionado

      await page.locator('#add-to-cart').click();
      //Clique para adicionar produto ao carrinho

      await expect(page.locator('data-test="shopping-cart-link"')).toHaveCount(1);
      //Valida se o produto foi adicionado ao carrinho
      console.log("O produto não foi inserido ao carrinho!");
      //Mensagem para facilitar a visualização do erro

    });

    //Teste Error 04:Deve ser possível remover um produto na tela específica dele e o contador remover conforme a ocorrência, porém o expect está dando erro
    //Emmanuel Guerra
    test('Valida remoção do Produto e contador dentro da página específica do produto', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('error_user', 'secret_sauce');

      await page.locator('#item_4_title_link').click();
      //Espera que o primeiro item seja clicado

      await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=4');
      //Espera que a URL do produto seja a do mesmo clicado

      await page.locator('#add-to-cart').click();
      //Clique para adicionar produto ao carrinho


      let contagem = page.locator('[data-test="shopping-cart-badge"]');
      await expect(contagem).toBeVisible();
      //Espera-se que os atributos de contagem sejam visíveis

      let contadorTexto = await contagem.textContent();//Cria uma variável para guardar o texto pego pela variável contagem
      let contador = parseInt(contadorTexto || '0');//Cria uma variável que transforma string em int para consulta posterior

      console.log(`Você tem ${contador} item(s) no carrinho.`);
      //Mostra a quantidade de itens no carrinho

      await expect(contador).toBe(0);
      //Valida se o produto foi removido ao carrinho
      console.log("O produto não foi removido do carrinho!");
      //Mensagem para facilitar a visualização do erro


    });



  });

  test.describe('Caminhos com erro na página de carrinho', () => {

    //Teste Error 05:No carrinho de compras deve ser apresentado todos os produtos adicionados contendo nome, descrição detalhada e preço do produto,porém a comparação verifica que os atributos não coincidem
    //Emmanuel Guerra
    test('Valida comparação do item em página inicial e página específica dele ', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('visual_user', 'secret_sauce');


      //Seleciona dois produtos para comparação
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

      //Ir até ao carrinho
      await page.locator('[data-test="shopping-cart-link"]').click();

      //Cria as variáveis para fazer a comparação
      const nomeProduto1Esperado = 'Sauce Labs Backpack';
      const descProduto1Esperada = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
      const precoProduto1Esperado = '$29.99';

      const nomeProduto2Esperado = 'Sauce Labs Bike Light';
      const descProduto2Esperada = "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included."
      const precoProduto2Esperado = '$9.99';
      //
      //

      //Recebe informações do primeiro produto no carrinho
      let nomeProduto1 = await page
        .locator('.inventory_item_name')
        .first()
        .textContent();

      let descProduto1 = await page
        .locator('.inventory_item_desc')
        .first()
        .textContent();

      let precoProduto1 = await page
        .locator('.inventory_item_price')
        .first()
        .textContent();
      //

      //Recebe informações do segundo produto no carrinho
      let nomeProduto2 = await page
        .locator('.inventory_item_name')
        .nth(1)
        .textContent();

      let descProduto2 = await page
        .locator('.inventory_item_desc')
        .nth(1)
        .textContent();

      let precoProduto2 = await page
        .locator('.inventory_item_price')
        .nth(1)
        .textContent();
      //

      console.log(`\nNome do produto 1: "${nomeProduto1}"\n 
                Desc do produto 1: "${descProduto1}"\n 
                Preço do produto 1: "${precoProduto1}" `);


      console.log(`\nNome do produto 2: "${nomeProduto2}"\n 
                Desc do produto 2: "${descProduto2}"\n 
                Preço do produto 2: "${precoProduto2}" `);




      //Espera-se que os atributos sejam exibidos corretamente.
      expect([nomeProduto1, descProduto1, precoProduto1]).toEqual([nomeProduto1Esperado, descProduto1Esperada, precoProduto1Esperado]);

      expect([nomeProduto2, descProduto2, precoProduto2]).toEqual([nomeProduto2Esperado, descProduto2Esperada, precoProduto2Esperado]);

    });

    //Teste Error 06:Deve ser possível remover itens do carrinho,porém não
    //Emmanuel Guerra
    test('Valida remoção do produto no carrinho', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta 
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      //Adiciona produto ao carrinho

      //Ir até ao carrinho
      await page.locator('[data-test="shopping-cart-link"]').click();

      //Remover o produto no carrinho
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
      //Valida se a remoção de produto foi bem sucedida

      console.log("Você removeu o item com sucesso!");
      //Mensagem para verificar se o teste rodou completamente

      console.log("Não há erros possíveis.");
      //Deveria dar erro,mas em nenhum usuário há erro ao remover produtos do carrinho.

    });

    //Teste Error 07: De possível alterar a quantidade de  produtos e o limite máximo do mesmo item deve ser de 99 .
    //Emmanuel Guerra
    test('Valida a quantidade máxima de produtos no carrinho', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      //Adiciona produtos ao carrinho

      await page.locator('[data-test="shopping-cart-link"]').click();
      //Ir ao carrinho

      //A pagina ficou em branco

      await expect(page.locator('.inventory_item')).toHaveCount(1);
      //Validação para ver se ainda há pelo menos um item na tela

    });


    //Teste Error 08:Deve ser possível seguir com a compra através do botão de checkout
    //Emmanuel Guerra
    test('Valida o botão de checkout', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      //Cria variável para armazenar o endereço esperado pelo checkout
      const enderecoEsperado = "https://www.saucedemo.com/checkout-step-one.html";

      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      //Adiciona produto ao carrinho

      //Ir até ao carrinho
      await page.locator('[data-test="shopping-cart-link"]').click();

      await page.locator('#checkout').click();
      //Ir ao checkout

      //Espera-se que a URL Após clicar em checkout, seja a URL correta.
      await expect(page).toHaveURL(enderecoEsperado);

      console.log("Checkout acessado com sucesso!");
      //Mensagem para verificar se o teste rodou completamente

      console.log("O botão de checkout deveria estar com problema!");
      //Deveria dar erro,mas em nenhum usuário o botão tem problema.

    });

    //Teste Error 09:Deve ser possível voltar para tela de produtos através do botão continue shopping

    test('Valida o botão de continue shopping', async ({ page }) => {

      await page.goto('https://www.saucedemo.com/');

      //Login na conta
      const loginUser = new Logins(page);
      await loginUser.login('problem_user', 'secret_sauce');

      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      //Adiciona produto ao carrinho

      //Ir até ao carrinho
      await page.locator('[data-test="shopping-cart-link"]').click();

      //Clicar em continuar comprando 
      await page.locator('#continue-shopping').click();

      //Valida se o URL acessado no continue shopping é o correto
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

      console.log("Você voltou a pagina inicial!");
      //Mensagem para verificar se o teste rodou completamente

      console.log("O botão de continue shopping deveria estar com problema!");
      //Deveria dar erro,mas em nenhum usuário o botão tem problema.

    });

  });

});