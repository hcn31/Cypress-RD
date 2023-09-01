import '@testing-library/cypress/add-commands';
export default class loginPageSSO {
  emailLogin() {
    return cy.get('#username');
  }
  passLogin() {
    return cy.get('#password');
  }
  buttonLogin() {
    return cy.get('[type="submit"]').first();
  }
}
