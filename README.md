# 🚀 Residência Tecnológica - Automação com Playwright

## 📘 Introdução

### 🏷️ Nome do Projeto:
**Residência Tecnológica - Automação com Playwright**

### 🎯 Contexto:
Este projeto foi desenvolvido como parte da **Residência Tecnológica**, um programa voltado para o desenvolvimento de habilidades práticas em áreas da tecnologia. Neste caso, o foco está na **Qualidade de Software (QA)** e na automação de testes utilizando a ferramenta **Playwright**, utilizando como base do nosso ambiente de testes o site *https://www.saucedemo.com/*

### 🎯 Objetivo:
O principal objetivo do projeto é aplicar testes automatizados em aplicações web utilizando o Playwright, garantindo a qualidade e a confiabilidade das funcionalidades testadas. A proposta é familiarizar os participantes com ferramentas modernas de automação e boas práticas de testes.

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

Com base na estrutura do repositório, o projeto está centrado em **testes automatizados de interface web** com Playwright. As principais funcionalidades incluem:

- 🧪 **Testes End-to-End (E2E):**
  - Arquivos como `example.spec.ts` e `demo-todo-app.spec.ts` mostram a utilização de testes que interagem com elementos da UI, simulando o comportamento do usuário.
  - Exemplo: adicionar ou remover tarefas em uma aplicação de lista de afazeres.

- 📁 **Organização por Pastas:**
  - `tests/` e `tests-examples/` armazenam os testes automatizados, permitindo modularidade e organização.
  
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
  Ambiente de desenvolvimento principal, como evidenciado na imagem.

---

## 📚 Lições Aprendidas

Durante o desenvolvimento deste projeto, os integrantes provavelmente adquiriram e fortaleceram habilidades como:

- 📌 **Criação e organização de testes automatizados.**
- 🔍 **Uso de ferramentas modernas de QA (Playwright).**
- 🤝 **Colaboração em equipe utilizando Git e GitHub.**
- 🔧 **Configuração de pipelines de CI com GitHub Actions.**
- 🧠 **Resolução de problemas em testes web, como tempo de carregamento e seleção de elementos.**

---

## ✅ Conclusão

O projeto **"Residência Tecnológica - Automação com Playwright"** representou uma experiência prática essencial no aprendizado de automação de testes de software. A equipe conseguiu aplicar conceitos de qualidade,
integração contínua e testes automatizados, enfrentando desafios reais encontrados no desenvolvimento de aplicações web modernas. O uso de Playwright e integração com GitHub Actions demonstra o compromisso com a adoção de ferramentas
profissionais e práticas de mercado. Finalizar este projeto com sucesso é um marco importante na formação técnica dos integrantes da residência.
