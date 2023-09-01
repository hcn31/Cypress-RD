import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
import { translate } from '../../../utils';
import { parseNumber } from '../../../utils';
let dictionary = translate();
const wait_10_secs = 10000;
export default function verifyCrise(criseData) {
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  earlyWarningsPage1.viewAllCrises().click();
  //generate the name of the crise
  //let criseName1 = criseData.criseName;
  let criseName1 = criseData.criseName;
  //test the imapct and severity
  earlyWarningsPage1.myCrise(criseName1).contains('Impact').siblings('div').contains('p', criseData.impact);
  earlyWarningsPage1.myCrise(criseName1).contains('Severity').siblings('div').contains('p', criseData.severity);
  //test if the number of associated warnings is correct
  earlyWarningsPage1
    .myCrise(criseName1)
    .findByText('Show Associated Warnings')
    .siblings('div')
    .children()
    .invoke('text')
    .then((text) => {
      let warningsNumber = parseInt(text);
      earlyWarningsPage1.myCrise(criseName1).findByText('Show Associated Warnings').click();
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
  //verify reach
  // Initialize an object to store the total reach for each author
  earlyWarningsPage1
    .myCrise(criseName1)
    .contains('Reach')
    .siblings('p')
    .invoke('text')
    .then((text) => {
      const reach = parseNumber(text);
      expect(criseData.reach).to.equal(reach);
    });
}
