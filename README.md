# 🚀 Residência Tecnológica - Automação com Playwright

## 📘 Introdução

### 🏷️ Nome do Projeto:
**Residência Tecnológica - Automação com Playwright**

### 🎯 Contexto:
Este projeto foi desenvolvido como parte da **Residência Tecnológica**, um programa voltado ao desenvolvimento de habilidades práticas em tecnologia. O foco está na área de **Qualidade de Software (QA)**, por meio da automação de testes com a ferramenta **Playwright**, utilizando como base o site *https://www.saucedemo.com/*.

### 🎯 Objetivo:
O principal objetivo do projeto é aplicar testes automatizados em aplicações web utilizando o Playwright, garantindo a qualidade e a confiabilidade das funcionalidades testadas.

### ✨ Destaques:
- ✅ **Primeiro projeto prático de automação de testes** do grupo dentro da residência.
- 🧠 Motivado pela necessidade de **garantir qualidade e cobertura de testes** em aplicações web.
- 👥 Desenvolvido de forma colaborativa pelos residentes:
  - 👨‍💻 **Emmanuel Guerra**
  - 👨‍💻 **Leonardo Antonio**
  - 👨‍💻 **Miguel Vieira**
  - 👨‍💻 **Nicolas Klayvert**

---

## 🔧 Principais Funcionalidades do Projeto

- 🧪 **Testes End-to-End (E2E):**
  - Os testes automatizados simulam interações reais dos usuários com a interface do site *saucedemo.com*.
  - Cada arquivo `.spec.ts` cobre um cenário específico, como login, navegação, adição de produtos ao carrinho e finalização de compra.
  - Exemplos práticos podem ser vistos nos arquivos `carrinho-compras.spec.ts`, `checkout.spec.ts`, entre outros.

- 📁 **Organização por Pastas:**
 - **`tests/`**: Contém os testes automatizados principais, cada arquivo `.spec.ts` corresponde a um cenário de teste real baseado no site *saucedemo.com*. Exemplos:
  - `carrinho-compras.spec.ts`: Testes relacionados ao carrinho de compras.
  - `checkout.spec.ts`: Validações do processo de checkout.
  - `filtro-produtos.spec.ts`: Testes de filtragem e ordenação de produtos.
  - `lista-de-produtos.spec.ts`: Verificação da exibição e comportamento da listagem de produtos.

- **`playwright-report/`**: Gera relatórios em HTML após a execução dos testes, facilitando a análise de falhas e execução.


- **`.github/workflows/`**: Contém as configurações do GitHub Actions, permitindo integração contínua (CI) para rodar testes automaticamente em cada push ou pull request.
  
- ⚙️ **Configuração Personalizada de Testes:**
  - O arquivo `playwright.config.ts` sugere configurações específicas para os testes, como tempo limite, diretórios de saída e parâmetros de execução.

- 🔄 **Integração com GitHub Actions:**
  - A pasta `.github/workflows/` contém um arquivo `playwright.yml`, indicando a **integração contínua (CI)** com o GitHub Actions para execução automática dos testes ao realizar commits ou pull requests.

---

## 🧰 Tecnologias Utilizadas

- **TypeScript** 🟦  
  Linguagem utilizada nos arquivos de teste (`.spec.ts`). Proporciona maior segurança no código por meio de tipagem estática.

- **Playwright** 🎭  
  Framework principal de automação de testes. Permite testar aplicações web em diferentes navegadores, com suporte a testes E2E, geração de relatórios e captura de vídeo/screenshot.

- **Node.js / npm** 🌐  
  Gerenciador de pacotes e runtime JavaScript. Responsável pela execução dos testes e gerenciamento de dependências.

- **GitHub Actions** ⚙️  
  Plataforma de CI/CD usada para automatizar os testes a cada alteração no repositório.

- **VS Code** 🧑‍💻  
  Ambiente de desenvolvimento principal.

---

## 📚 Lições Aprendidas

Durante o desenvolvimento deste projeto, os integrantes adquiriram e fortaleceram habilidades como:

- 📌 **Criação e organização de testes automatizados.**
- 🔍 **Uso de ferramentas modernas de QA (Playwright).**
- 🤝 **Colaboração em equipe utilizando Git e GitHub.**
- 🔧 **Configuração de pipelines de CI com GitHub Actions.**
- 🧠 **Resolução de problemas em testes web, como tempo de carregamento e seleção de elementos.**

---

## ✅ Conclusão

O projeto **"Residência Tecnológica - Automação com Playwright"** representou uma experiência prática essencial no aprendizado de automação de testes de software. A equipe conseguiu aplicar conceitos de qualidade,
integração contínua e testes automatizados, enfrentando desafios reais encontrados no desenvolvimento de aplicações web modernas. O uso de Playwright e integração com GitHub Actions demonstra o compromisso com a adoção de ferramentas
profissionais e práticas de mercado. Finalizar este projeto com sucesso é um marco importante nossa formação.
