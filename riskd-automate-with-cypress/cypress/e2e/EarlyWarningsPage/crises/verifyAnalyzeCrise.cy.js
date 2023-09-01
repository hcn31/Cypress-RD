import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
import { parseNumber } from '../../../utils';
import { reportUrl } from '../../../utils';
const wait_10_secs = 10000;
export default function verifyAnalyzeCrise(criseData) {
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  let earlyWarningsPage1 = new earlyWarningsPage();
  earlyWarningsPage1.viewAllCrises().click();
  //hover on the crise
  let criseName1 = criseData.criseName;
  //get the cirisis ID
  let crisisID;
  earlyWarningsPage1
    .myCrise(criseName1)
    .parent()
    .parent()
    .invoke('attr', 'id')
    .then((attributeValue) => {
      crisisID = attributeValue;
      //test the imapct and severity
      earlyWarningsPage1.myCrise(criseName1).eq(0).trigger('mouseover');
      //click on analyse to display the analyze
      cy.contains('p', 'Analyze').click();
      //get the value of the cisis ID
      const reportAnalyz = reportUrl(riskDetectionUrl, 'crises', crisisID);
      cy.visit(reportAnalyz);
      cy.wait(wait_10_secs);
      //test the warning name
      cy.contains('.bbRFLc > .igEWVt > .sc-gxYJeL > p', criseData.criseName);
      //test the number of mentions
      //cy.contains('Mentions').parent().parent().siblings().should('have.text', criseData.mentions);
      //test the impact and severity
      cy.contains('Impact').parent().parent().siblings().should('have.text', criseData.impact);
      cy.contains('Severity').parent().parent().siblings().should('have.text', criseData.severity);
      //test the reach
      cy.contains('Reach')
        .parent()
        .parent()
        .siblings()
        .invoke('text')
        .then((text) => {
          const reach = parseNumber(text);
          expect(criseData.reach).to.equal(reach);
        });
    });
}
