import '@testing-library/cypress/add-commands';
export default class crisesPage {
  myCrise = (Selector) =>
    cy
      .contains('p', 'Ongoing Crises')
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
  viewAllCrises = () => cy.findByText('View all');
  crisesMatrix = (element) => cy.get('.cAebmU').first().find(`:nth-child(${element})`).children('div .hChgMx');
  archive = () => cy.findByText('archive').parent('button');
  archivedCrises = () =>
    cy.findByText('Archived Crises').parent().parent().siblings('div').children('div').children('div');
  myArchivedCrise = (Selector) =>
    this.archivedCrises().contains('p', Selector).parent().parent().parent().parent().parent();
}
