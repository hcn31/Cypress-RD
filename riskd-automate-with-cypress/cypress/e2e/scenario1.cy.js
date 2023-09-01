import login from './login/login.cy';
import addCrise from './EarlyWarningsPage/crises/addCrise.cy';
import verifyCrise from './EarlyWarningsPage/crises/verifyCrise.cy';
import verifyAnalyzeCrise from './EarlyWarningsPage/crises/verifyAnalyzeCrise.cy';
describe('Main tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    login();
    cy.viewport(1280, 720);
  });
  //this test will mark as crisis the first warning displayed in the early warnings system bloc
  /* it('Does test adding a crise', () => {
    cy.fixture('testData').then((testData) => {
      addCrise(testData.markCrise.asset, testData.markCrise.riskType, testData.markCrise.configCrise0);
    });
  });
  //this test will verify a crisis card int the page early warnings
  it('Does verify a crise', () => {
    cy.fixture('testData').then((testData) => {
      verifyCrise(testData.criseData);
    });
  });*/
  it('Does verify the analyze of a crisis', () => {
    cy.fixture('testData').then((testData) => {
      verifyAnalyzeCrise(testData.criseData);
    });
  });
});
