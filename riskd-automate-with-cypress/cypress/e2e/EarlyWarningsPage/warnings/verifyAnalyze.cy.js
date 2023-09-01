import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
import { reportUrl } from '../../../utils';
const wait_10_secs = 10000;
export default function verifyAnalyze(assetName, riskType, warningData) {
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  let earlyWarningsPage1 = new earlyWarningsPage();
  //filter the warnngs by name of asset and risk type
  earlyWarningsPage1.filterBy(assetName, riskType);
  //hover on the first warning
  earlyWarningsPage1.listWarnings().contains(warningData.warningName).eq(0).trigger('mouseover');
  //click on analyse to display the analyze
  cy.contains('p', 'Analyze').click();
  //get the value of the cisis ID

  earlyWarningsPage1
    .listWarnings()
    .contains(warningData.warningName)
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .invoke('attr', 'id')
    .then((attributeValue) => {
      const warningID = attributeValue;
      cy.log(warningID);
      const reportAnalyz = reportUrl(riskDetectionUrl, 'warnings', warningID);
      cy.visit(reportAnalyz);
      cy.wait(wait_10_secs);
      //test the warning name
      cy.contains('.bbRFLc > .igEWVt > .sc-gxYJeL', warningData.warningName);
      //test the risk type
      cy.contains('.hBXcDI > .sc-gxYJeL', riskType);
      //test the reach
      cy.contains('Reach').parent().parent().siblings().should('have.text', warningData.reach);
      //test the number of mentions
      cy.contains('Mentions').parent().parent().siblings().should('have.text', warningData.mentions);
      //test the impact and severity
      cy.contains('Impact').parent().parent().siblings().should('have.text', warningData.impact);
      cy.contains('Severity').parent().parent().siblings().should('have.text', warningData.severity);
      cy.get('.fDyBZv > .sc-kPTPQs > :nth-child(1)').should('have.text', warningData.topAuthor);
    });
}
