//import loginPage from '../../Elements/Pages/LoginPage';
import loginPageSSO from '../../Elements/Pages/loginPageSSO';
function login() {
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  const riskDetectionLogin = Cypress.env('riskDetectionLogin');
  const riskDetectionPassword = Cypress.env('riskDetectionPassword');
  const emailRegex = /^[a-zA-Z]+(\.[a-zA-Z]+)*@[a-z]*\.com$/;
  //test the format of the login
  if (!emailRegex.test(riskDetectionLogin)) {
    cy.log('Invalid login format');
    throw new Error('Invalid login format');
  }
  cy.session([riskDetectionLogin, riskDetectionPassword], () => {
    //let loginPage1=new loginPage()
    let loginPage1 = new loginPageSSO();
    cy.viewport(1200, 720);
    //cy.visit(riskDetectionUrl)
    cy.visit('https://social.int.digimind.tech/d/intqa/reader/home.do');
    //'https://social.digimind.com/d/fh4/reader/home.do
    loginPage1.emailLogin().type(riskDetectionLogin);
    loginPage1.passLogin().click().type(riskDetectionPassword);
    loginPage1.buttonLogin().click({ force: true });
    cy.visit(riskDetectionUrl);
  });
}
export default login;
