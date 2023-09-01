import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';

function deleteAsset(assetName) {
  //instance of the class
  let earlyWarningsPage1 = new earlyWarningsPage();
  //visit Risk Detetction Early warnings page
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  //hover on the asset in the MAF and click on delete
  earlyWarningsPage1.deleteAsset(assetName).click();
  //Type the name of asset to confirm deletion
  earlyWarningsPage1.deleteAssInp().type(assetName);
  //click on delete
  //earlyWarningsPage1.delete().click();
  //check that the asset is deleted
  earlyWarningsPage1.assetFacette(assetName).should('not.exist');
}
export default deleteAsset;
