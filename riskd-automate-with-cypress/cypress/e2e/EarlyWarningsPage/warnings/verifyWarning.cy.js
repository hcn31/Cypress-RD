import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
import { warningName } from '../../../utils';
const wait_10_secs = 10000;

export default function verifyWarning(assetName, riskType) {
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  /// cy.intercept('GET','https://social.int.digimind.tech/app/intqa/riskDetection/earlyWarnings').as('TEST')
  /*  cy.visit(riskDetectionUrl);
  cy.intercept('GET', '**').as('pageLoad');
  cy.wait('@pageLoad');*/
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  //filter by asset name and risk type the warnings in early warnings system
  earlyWarningsPage1.filterBy(assetName, riskType);
  cy.wait(wait_10_secs);

  //generate the name of warning
  let warningName1 = warningName(assetName, riskType);
  //test the title of the first waning
  earlyWarningsPage1
    .earlyWarning()
    .contains('p', warningName1)
    .then(($div) => {
      let content = $div.text();
      const searchText = assetName;
      const index = content.indexOf(searchText);
      const warningName1 = content.substring(0, index + searchText.length);

      //test the label of the first warning
      cy.get(
        ':nth-child(1) > [style="--mdc-theme-on-primary: rgba(0, 0, 0, 0.87); --mdc-theme-primary: #48c6f0;"] > .cvIDat > .giVYFe > .ceLZMk > .jJcNSc > .beght > .sc-kPTPQs:nth-child(1)'
      ).should('contain', riskType);
      if (riskType == 'Risk signaled by AI SENSE') {
        /* cy.get(
      ':nth-child(1) > [style="--mdc-theme-on-primary: rgba(0, 0, 0, 0.87); --mdc-theme-primary: #48c6f0;"] > .cvIDat > .giVYFe > .ceLZMk > .jJcNSc > .beght > .sc-kPTPQs:nth-child(2)'
    ).should('contain', 'Legal');*/
      }
      let author, imp, sev, reach, mentions;
      //Test that the author exists

      earlyWarningsPage1
        .earlyWarning()
        .contains('p', 'Top author')
        .then(($div) => {
          author = $div.siblings('.fBaPtn').text();
        });
      //test that the severity, the impact and the reach exist
      earlyWarningsPage1
        .earlyWarning()
        .contains('p', 'Impact')
        .then(($div) => {
          imp = $div // select the element you want to search within
            .siblings('div') // select all its siblings that are div elements
            .find('p:contains("Minor"), p:contains("Medium"), p:contains("Major")') // select all the p elements containing the required text
            .text(); // extract the text content of the matching elements
        });
      earlyWarningsPage1
        .earlyWarning()
        .contains('p', 'Severity')
        .then(($div) => {
          sev = $div // select the element you want to search within
            .siblings('div') // select all its siblings that are div elements
            .find('p:contains("Minor"), p:contains("Medium"), p:contains("Major")') // select all the p elements containing the required text
            .text(); // extract the text content of the matching elements
        });
      earlyWarningsPage1
        .earlyWarning()
        .contains('p', 'Reach')
        .then(($div) => {
          reach = $div.siblings('p').text();
        });
      earlyWarningsPage1
        .earlyWarning()
        .contains('times')
        .invoke('text')
        .then((text) => {
          const pattern = /(\d+)\s+times/; // pattern to match the number before "times"
          const match = text.match(pattern);
          if (match) {
            mentions = parseInt(match[1]); // extract the number from the match
            //Associated warnings
            earlyWarningsPage1.earlyWarning().first().click();
            cy.contains('h2', 'Associated Mentions')
              .siblings('div')
              .children()
              .children()
              .children()
              .filter('div')
              .its('length')
              .should('eq', mentions);
          } else {
            mentions = 1;
          }
          cy.fixture('Testdata.json').then((data) => {
            data.warningData.warningName = warningName1;
            data.warningData.mentions = mentions;
            data.warningData.severity = sev;
            data.warningData.impact = imp;
            data.warningData.reach = reach;
            data.warningData.topAuthor = author;
            cy.writeFile('cypress/fixtures/Testdata.json', data);
          });
        });
    });
}
