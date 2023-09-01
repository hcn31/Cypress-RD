import crisesPage from '../../Elements/Pages/crisesPage';
import earlyWarningsPage from '../../Elements/Pages/earlyWarningsPage';
import { translate } from '../../utils';
let dictionary = translate();
const wait_10_secs = 10000;
export default function verifyCriseCrisesPage(criseData) {
  let crisesPage1 = new crisesPage();
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  //go to Crises page
  earlyWarningsPage1.crises().click();
  //generate the name of the crise
  crisesPage1.viewAllCrises().click();
  let criseName1 = criseData.criseName;
  //test the impact and the severity
  crisesPage1.myCrise(criseName1).contains('Impact').siblings('div').contains('p', criseData.impact);
  crisesPage1.myCrise(criseName1).contains('Severity').siblings('div').contains('p', criseData.severity);
  //test if the number of associated warnings is correct
  crisesPage1
    .myCrise(criseName1)
    .findByText('Show Associated Warnings')
    .siblings('div')
    .children()
    .invoke('text')
    .then((text) => {
      let warningsNumber = parseInt(text);
      crisesPage1.myCrise(criseName1).findByText('Show Associated Warnings').click();
      cy.contains('h2', new RegExp(`${dictionary.warningContent.linkedWith}|${dictionary.warningContent.mentionedBy}`))
        .siblings('div')
        .children()
        .children()
        .children()
        .children()
        .filter('div')
        .its('length')
        .should('eq', warningsNumber);
    });
}
