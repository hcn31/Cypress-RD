import '@testing-library/cypress/add-commands';
let dictionary;
if (Cypress.env('riskDetectionLanguage') === 'fr') {
  dictionary = require('../../../risk-management-fr.json');
} else if (Cypress.env('riskDetectionLanguage') === 'en') {
  dictionary = require('../../../risk-management-en.json');
}
export default class earlyWarningsPage {
  impacts = () => [dictionary.impacts.LOW, dictionary.impacts.MEDIUM, dictionary.impacts.HIGH];
  severities = () => [dictionary.severities.LOW, dictionary.severities.MEDIUM, dictionary.severities.HIGH];
  addAsset = () => cy.get('i.icon-add');
  deleteAsset = (Nameofasset) => this.assetFacette(Nameofasset).trigger('mouseover').get('.icon-delete-outline');
  deleteAssInp = () => cy.contains('p', 'To confirm deletion, please type').siblings('label').click();
  delete = () => cy.findByText('delete').parent();
  categorieAsset = (Ass_Type) => cy.get(Ass_Type);
  nextAssetButton = () => cy.findByText(/next|suivant/).parent('button'); //dosent exist in the dictionary
  advancedQuery = () => cy.findByText(dictionary.manageAsset.switchToAdvancedQuery).siblings('div');
  assetNameInput = () => cy.findByRole('textbox');
  assetNameInputS = () =>
    cy
      .contains('p', /brand name|keywords/) //attention!!!!
      .parent()
      .parent()
      .parent()
      .find('label')
      .last()
      .findByRole('textbox');
  advancedSettingsAsset = () => cy.findByText(dictionary.manageAsset.advancedSettings);
  addSynonym = () => cy.findByText(dictionary.manageAsset.addSynonym).parent();
  hashtagAssetInput = (index) =>
    cy
      .contains('Hashtags') //prblem
      .parent('div')
      .siblings('div')
      .find(`:nth-child(${index})`)
      .children('label')
      .children('input');
  addSynonymHashtagAsset = () =>
    cy
      .contains('label', 'Hashtags')
      .parent('div')
      .siblings('div')
      .findByText(dictionary.manageAsset.addSynonym)
      .parent(); //problem
  countries = () => cy.findByText(dictionary.country).parent().siblings('div').find('.icon-arrow-drop-down');
  languages = () => cy.findByText(dictionary.languages).parent().siblings('div').find('.icon-arrow-drop-down');

  riskTypeAsset = (element) =>
    cy.get('div .fkuYUs').children().first().parent().find(`:nth-child(${element})`).children('div').first();
  saveButtonAsset = () => cy.get('.mdc-button--raised');
  assetFacette = (Nameofasset) => cy.findByText(dictionary.assets).parent().siblings('div').findAllByText(Nameofasset);
  customInput = () => cy.get('.bHnffo');
  //cy.get('.sc-cRZddA > div')
  addButtonCustom = () => cy.get('.fxwAst > .eYTfxK > :nth-child(2) > .gSGUrG > .mdc-button__ripple');
  listSeverityKeyword = (keyword) => cy.get(`.guOlor > :nth-child(${keyword})`).find('.icon-arrow-drop-down');
  severityKeyword = (severity, element) => cy.get(`#react-select-${severity}-option-${element}`);
  finishButtonCustom = () => cy.findByText(dictionary.finish).parent();
  listWarnings = () =>
    cy
      .contains('p', dictionary.earlyWarningSystem)
      .parent()
      .parent()
      .siblings('div')
      .children('div')
      .find(':nth-child(1)');
  warningsOption = (Selector) => cy.contains('p', Selector).parent();
  criseSev = () => cy.findByText(dictionary.chooseSeverity).parent('div').findByRole('listbox').click();
  criseImp = () => cy.findByText(dictionary.chooseImpact).parent('div').findByRole('listbox').click();

  myCrise = (Selector) =>
    cy
      .contains('p', dictionary.onGoingCrises)
      .parent()
      .parent()
      .siblings('div')
      .children('div')
      .find(':nth-child(1)')
      .contains('p', Selector)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent();
  filterBy(assetName, riskType) {
    if (assetName) this.assetFacette(assetName).click();
    if (riskType) {
      cy.contains('p', dictionary.earlyWarningSystem).parent('div').siblings('div').findByRole('button').click();
      cy.contains('li', riskType).click({ force: true });
      cy.get('body').then((body) => {
        if (body.text().includes('Oops! Something Went Wrong.')) {
          // if the paragraph with the text exists, click the refresh button
          cy.findByText('Refresh').parent().click();
        }
      });
    }
  }
  viewAllCrises = () => cy.findByText('View all');
  crises = () => cy.findByText(dictionary.crises);
  earlyWarning = () =>
    cy
      .contains('p', dictionary.earlyWarningSystem)
      .parent()
      .parent()
      .siblings('div')
      .children()
      .children()
      .first()
      .children();
}
