export class Logins {
  constructor(page) {
    this.page = page;
    this.username = page.locator('[data-test="username"]');
    this.password = page.locator('[data-test="password"]');
    this.botaoLogin = page.locator('[data-test="login-button"]');
  }

    async login(nome, senha) {
    await this.username.fill(nome);
    await this.password.fill(senha);
    await this.botaoLogin.click();
  }
}