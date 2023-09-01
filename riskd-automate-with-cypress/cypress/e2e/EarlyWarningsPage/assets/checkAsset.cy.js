import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';

function checkAsset(assetName) {
  let earlyWarningsPage1 = new earlyWarningsPage();
  cy.visit(Cypress.env('riskDetectionUrl'));
  expect(earlyWarningsPage1.assetFacette(assetName)).to.exist;
}
export default checkAsset;
