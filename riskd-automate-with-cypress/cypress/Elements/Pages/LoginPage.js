import '@testing-library/cypress/add-commands';
export default class loginPage {
  emailLogin() {
    return cy.findByLabelText('E-Mail').click();
  }
  passLogin() {
    return cy.findByLabelText('Password').click();
  }
  buttonLogin() {
    return cy.findByRole('button', { name: 'Login' });
  }
}
