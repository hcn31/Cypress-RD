import crisesPage from '../../Elements/Pages/crisesPage';
import earlyWarningsPage from '../../Elements/Pages/earlyWarningsPage';
import { translate } from '../../utils';
let dictionary = translate();
const wait_10_secs = 10000;
export default function archiveCrise(criseData) {
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  let earlyWarningsPage1 = new earlyWarningsPage();
  let crisesPage1 = new crisesPage();
  //generate the name of the crise
  let criseName1 = criseData.criseName;
  //go to the Crises Page
  earlyWarningsPage1.crises().click();
  //click on view all
  crisesPage1.viewAllCrises().click();
  //Click on archive
  crisesPage1.myCrise(criseName1).trigger('mouseover').contains('p', dictionary.actions.archive).parent().click();
  //click on archive in the pop up
  crisesPage1.archive().click();
}

export function verifyArchivedCrise(criseData) {
  let crisesPage1 = new crisesPage();
  //generate the name of the crise
  let criseName1 = criseData.criseName;
  //reload the page
  cy.reload();
  cy.wait(wait_10_secs);
  //test the archived crise
  crisesPage1.archivedCrises().contains('p', criseName1);
  //test the severity and the impact
  crisesPage1.myArchivedCrise(criseName1).contains(dictionary.impact).siblings('div').contains('p', criseData.impact);
  crisesPage1
    .myArchivedCrise(criseName1)
    .contains(dictionary.severity)
    .siblings('div')
    .contains('p', criseData.severity);
  //test of the number of associated warnings is correct
  crisesPage1
    .myArchivedCrise(criseName1)
    .findByText('Show Associated Warnings')
    .siblings('div')
    .children()
    .invoke('text')
    .then((text) => {
      let warningsNumber = parseInt(text);
      crisesPage1.myArchivedCrise(criseName1).findByText('Show Associated Warnings').click();
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
