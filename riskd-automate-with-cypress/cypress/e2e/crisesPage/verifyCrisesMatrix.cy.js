import crisesPage from '../../Elements/Pages/crisesPage';
import earlyWarningsPage from '../../Elements/Pages/earlyWarningsPage';
const wait_10_secs = 10000;
function verifyCriseMatrix(AssetName, criseData) {
  let crisesPage1 = new crisesPage();
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  //go to Crises page
  earlyWarningsPage1.crises().click();
  //this matrix represent tha grid that contains the Risk Matrix
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const severityIndex = ['Major', 'Medium', 'Minor'].indexOf(criseData.severity);
  const impactIndex = ['Minor', 'Medium', 'Major'].indexOf(criseData.impact);
  //find the correct place of the impact and severity in tha matrix
  const child = matrix[severityIndex][impactIndex];
  cy.log(child);
  cy.wait(wait_10_secs);
  //test if this plae conatins the crise
  crisesPage1.crisesMatrix(child).contains('p', AssetName);
}
export default verifyCriseMatrix;
