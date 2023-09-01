import login from './login/login.cy';
import addAsset from './EarlyWarningsPage/assets/addAsset.cy';
import checkAsset from './EarlyWarningsPage/assets/checkAsset.cy';
import addCrise from './EarlyWarningsPage/crises/addCrise.cy';
import verifyCrise from './EarlyWarningsPage/crises/verifyCrise.cy';
import verifyCriseCrisesPage from './crisesPage/verifyCriseCrisesPage.cy';
import VerifyCrisesMatrix from './crisesPage/verifyCrisesMatrix.cy';
import archiveCrise, { verifyArchivedCrise } from './crisesPage/archiveCrise.cy';
import verifyWarning from './EarlyWarningsPage/warnings/verifyWarning.cy';
import verifyAnalyze from './EarlyWarningsPage/warnings/verifyAnalyze.cy';
import deleteAsset from './EarlyWarningsPage/assets/deleteAsset.cy';
import verifyAnalyzeCrise from './EarlyWarningsPage/crises/verifyAnalyzeCrise.cy';
describe('Main tests', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  beforeEach(() => {
    login();
    cy.viewport(1200, 720);
  });
  //this test will mark as crisis the first warning displayed in the early warnings system bloc
  /*it('Does test adding a crise', () => {
    cy.fixture('testData').then((testData) => {
      addCrise(testData.markCrise.asset, testData.markCrise.riskType, testData.markCrise.configCrise1);
    });
  });
  //this test will verify a crisis card int the page early warnings
  it('Does verify a crise', () => {
    cy.fixture('testData').then((testData) => {
      verifyCrise(testData.criseData);
    });
  });
  //this test will verify a crisis card in the page crises
  it('Does verify a crise in the Crises Page', () => {
    cy.fixture('testData').then((testData) => {
      verifyCriseCrisesPage(testData.criseData);
    });
  });
  //this test will verify that the asset is in the right place in the matrix
  it('Does verify the place of an asset in the crises Matrix', () => {
    cy.fixture('testData').then((testData) => {
      VerifyCrisesMatrix('Ferrari', testData.criseData);
    });
  });

  //this test will archive a crisis and check it in the archived bloc
  it('Does archive a crise crise and verify it in the archived crises bloc', () => {
    cy.fixture('testData').then((testData) => {
      archiveCrise(testData.criseData);
      verifyArchivedCrise(testData.criseData);
    });
  });
  //For Brand:brand/ For Key people:person-pin/for brand ambassador:record-voice/ for product:product/ for campaign:campaign/for costum :auto-fix
  //ajout d'asset de type brand avec configuration par defaut(configAsset0)
  it('Does add an asset brand', () => {
    cy.fixture('testData').then((testData) => {
      addAsset(testData.addAsset.assetName, 'brand', testData.addAsset.configAsset1);
      checkAsset(testData.addAsset.assetName[0]);
    });
  });
  it('Does add an asset custom', () => {
    cy.fixture('testData').then((testData) => {
      addAsset(testData.addAsset.assetName, 'auto-fix', testData.addAsset.configAsset0);
    });
  });
  it('Does delete an asset', () => {
    cy.fixture('testData').then((testData) => {
      deleteAsset('Nike');
    });
  });
*/
  it('Does verify a warning', () => {
    cy.fixture('testData').then((testData) => {
      verifyWarning('Adidas', 'Risk signaled by AI SENSE');
    });
  });
  //Not Done
  it('Does verify the analyze of a warning', () => {
    cy.fixture('testData').then((testData) => {
      verifyAnalyze('Adidas', 'Risk signaled by AI SENSE', testData.warningData);
    });
  });
  /*
  it('Does verify the analyze of a crisis', () => {
    cy.fixture('testData').then((testData) => {
      verifyAnalyzeCrise(testData.criseData);
    });
  });
  */
});
