import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
import 'cypress-wait-until';
import { translate } from '../../../utils';
import { parseNumber } from '../../../utils';
let dictionary = translate();

const wait_10_secs = 10000;
function addCrise(assetName, riskType, configCrise) {
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.waitUntil(() =>
    cy.contains('Risk Detection').then(() => {
      cy.contains('Risk Detection').should('exist');
    })
  );
  let severities = earlyWarningsPage1.severities();
  let impacts = earlyWarningsPage1.impacts();
  if (configCrise) {
    if (configCrise.GoingCrisis) {
      earlyWarningsPage1.viewAllCrises().click();
      let maxImpact, maxSeverity;
      earlyWarningsPage1
        .myCrise(configCrise.GoingCrisis)
        .contains(dictionary.impact)
        .siblings('div')
        .contains('p', new RegExp(impacts.join('|')))
        .invoke('text')
        .then((text) => {
          // Use the text content in your test
          maxImpact = Math.max(impacts.indexOf(text), impacts.indexOf(configCrise.impact));
          cy.log(text + configCrise.impact);
        });

      earlyWarningsPage1
        .myCrise(configCrise.GoingCrisis)
        .contains(/Sévérité|Severity/) //prblllm
        .siblings('div')
        .contains('p', new RegExp(severities.join('|')))
        .invoke('text')
        .then((text) => {
          // Use the text content in your test
          maxSeverity = Math.max(severities.indexOf(text), severities.indexOf(configCrise.severity));
          cy.log(maxSeverity);
        });
      cy.fixture('Testdata.json').then((data) => {
        data.criseData.severity = severities[maxSeverity];
        data.criseData.impact = impacts[maxImpact];
        data.criseData.criseName = configCrise.GoingCrisis;
        cy.writeFile('cypress/fixtures/Testdata.json', data);
      });
    } else {
      cy.fixture('Testdata.json').then((data) => {
        data.criseData.severity = configCrise.severity;
        data.criseData.impact = configCrise.impact;
        if (configCrise.criseName) {
          data.criseData.criseName = configCrise.criseName;
        } else {
          if (riskType == 'unusual big influencers')
            data.criseData.criseName =
              assetName +
              dictionary.warningContent.mentionedBy +
              ' ' +
              dictionary.warningContent.unusualBigInfluerncers;
          else if (riskType == 'Custom Risk Terms')
            data.criseData.criseName = dictionary.warningContent.linkedWith + ' ' + assetName;
          else if (riskType == 'Risk signaled by AI SENSE')
            data.criseData.criseName = dictionary.warningContent.linkedWith + ' ' + assetName;
        }
        cy.writeFile('cypress/fixtures/Testdata.json', data);
      });
    }
  }
  //filter the warning using the name of asset and the risk type
  earlyWarningsPage1.filterBy(assetName, riskType);
  cy.wait(wait_10_secs);
  earlyWarningsPage1.listWarnings().find(':nth-child(1)').eq(0).trigger('mouseover');
  earlyWarningsPage1.warningsOption(dictionary.markAsCrisis.title).click();
  if (configCrise) {
    //create a new crisis with a personalized name
    if (configCrise.criseName) {
      cy.get('div[role="textbox"]').then(($div) => {
        cy.wrap($div).invoke('text', configCrise.criseName);
      });
    }
    //add the crisis to an existing crisis

    if (configCrise.GoingCrisis) {
      cy.findByText(dictionary.markAsCrisis.addOnGoingCrisis)
        .siblings('div')
        .contains('span', configCrise.GoingCrisis)
        .click();
    }
    if (configCrise.severity)
      earlyWarningsPage1.criseSev(dictionary.severity).contains('li', configCrise.severity).click();
    if (configCrise.impact) earlyWarningsPage1.criseImp(dictionary.impact).contains('li', configCrise.impact).click();
  }
  //click on "Next"
  //cy.findByText('next').parent('button').click();
  //cy.findByText('skip').parent('button').click()
  cy.reload();
  cy.wait(wait_10_secs);
  earlyWarningsPage1.viewAllCrises().click();

  cy.fixture('Testdata.json').then((data) => {
    earlyWarningsPage1.myCrise(data.criseData.criseName).findByText('Show Associated Warnings').click();
    const authorReach = new Map();

    // Iterate over each warning element and extract the reach and author information
    cy.wait(wait_10_secs);
    cy.contains('h2', new RegExp(`${dictionary.warningContent.linkedWith}|${dictionary.warningContent.mentionedBy}`))
      .siblings('div')
      .children()
      .children()
      .children()
      .children()
      .each((warning) => {
        if (warning.is('div')) {
          cy.wrap(warning).should('exist');
          let reach;
          cy.wrap(warning)
            .contains('p', dictionary.reach)
            .siblings('p')
            .invoke('text')
            .then((text) => {
              reach = parseNumber(text);
            });
          let author;
          cy.wrap(warning)
            .findByText('Top author')
            .parent()
            .find('.fBaPtn')
            .invoke('text')
            .then((text) => {
              author = text;
            })
            .then(() => {
              // If the author already exists in the object, take the maximum reach value
              if (!isNaN(reach)) {
                if (authorReach.has(author)) {
                  const oldValue = authorReach.get(author);
                  if (reach > oldValue) {
                    authorReach.set(author, reach);
                  }
                } else {
                  authorReach.set(author, reach);
                }
              }
            });
        }
      });
    // Calculate the total reach by summing the reach of each author in the object
    cy.wrap(authorReach).then((myReachs) => {
      let totalReach = 0;
      for (const value of myReachs.values()) {
        totalReach += value;
      }
      data.criseData.reach = totalReach;
      cy.writeFile('cypress/fixtures/Testdata.json', data);
    });
  });
  //take a screesnshot if the env var TAKESCREENSHOTS is set to true
  const screenShots = Cypress.env('TAKESCREENSHOTS');
  if (screenShots == true) {
    cy.screenshot();
  }
}
export default addCrise;
