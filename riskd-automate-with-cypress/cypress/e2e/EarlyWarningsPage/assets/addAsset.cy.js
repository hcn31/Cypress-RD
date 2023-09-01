import earlyWarningsPage from '../../../Elements/Pages/earlyWarningsPage';
const wait_10_secs = 10000;
function addAsset(assetName, Selector, config) {
  let earlyWarningsPage1 = new earlyWarningsPage();
  const riskDetectionUrl = Cypress.env('riskDetectionUrl');
  cy.visit(riskDetectionUrl);
  cy.wait(wait_10_secs);
  earlyWarningsPage1.addAsset().click();
  //selector of the icon of Asset Category
  let assetType = 'i.icon-' + Selector;
  earlyWarningsPage1.categorieAsset(assetType).click();
  //click on "Next"
  earlyWarningsPage1.nextAssetButton().click();
  //insert the name of asset and the synonym for the config by default
  if (!config) {
    let assetNameLength = assetName.length;
    assetName.forEach(function (element) {
      earlyWarningsPage1.assetNameInputS().type(element, { parseSpecialCharSequences: false }).blur();
      if (assetNameLength > 1) {
        earlyWarningsPage1.addSynonym().click();
        assetNameLength--;
      }
    });
  }
  //if there is a configuration
  else {
    //if boolean query
    if (config.advanced == '1') earlyWarningsPage1.advancedQuery().click();
    let assetNameLength = assetName.length;
    //insert name of asset and the synonym
    assetName.forEach(function (element) {
      let index = assetName.length - assetNameLength + 1;
      if (config.advanced == '0')
        earlyWarningsPage1.assetNameInputS().type(element, { parseSpecialCharSequences: false }).blur();
      else
        earlyWarningsPage1
          .assetNameInput()
          .type('"' + element + '"', {
            parseSpecialCharSequences: false,
          })
          .blur();
      if (assetNameLength > 1) {
        if (config.advanced == '1')
          earlyWarningsPage1.assetNameInput(index).type(' OR ', { parseSpecialCharSequences: false }).blur();
        else earlyWarningsPage1.addSynonym().click();
        assetNameLength--;
      }
    });
    //advanced settings
    earlyWarningsPage1.advancedSettingsAsset().click();
    //insert the hashtags if it's not advanced query
    if (config.advanced == '0') {
      let hashtagLength = config.hashtag.length;
      config.hashtag.forEach(function (element) {
        let index = config.hashtag.length - hashtagLength + 1;
        earlyWarningsPage1.hashtagAssetInput(index).type(element);
        if (hashtagLength > 1) {
          cy.log('hyyyy');
          earlyWarningsPage1.addSynonymHashtagAsset().click();
          hashtagLength--;
        } else cy.log('helloooo 1');
      });
    }
    //countries
    if (config.countries.length) earlyWarningsPage1.countries().click();
    config.countries.forEach((elem) => {
      cy.findByText(elem).click();
    });

    //languages
    if (config.languages.length) earlyWarningsPage1.languages().click();
    config.languages.forEach((elem) => {
      cy.findByText(elem).click();
    });

    //cy.get('div.sc-kPTPQs.yodxC > div > div:nth-child(8) > div').find(':nth-child(1)').find(':nth-child(6)').click({force: true})
    //cy.contains('p','Risk Types').parent().get('div:nth-child(8)').children().get('div:nth-child(1)').eq(0).click({force: true})
    //cy.contains('p','Risk Types').parent().get('div:nth-child(8)').children().get('div:nth-child(4)').eq(0).click({force: true})
    //Risk Types of the assset
    //deselect Risk Signaled By AI SENSE and Unusual Big Influencer
    earlyWarningsPage1.riskTypeAsset('1').click();
    earlyWarningsPage1.riskTypeAsset('4').click();
    let severity = 4;
    for (var prop in config.riskType) {
      if (config.riskType[prop] != 0 && config.riskType[prop] != null) {
        earlyWarningsPage1.riskTypeAsset(prop).click();
        if (prop == 5 || prop == 6) {
          config.riskType[prop].forEach((element) => {
            earlyWarningsPage1.customInput().type(element[0]).type('{enter}');
          });
          earlyWarningsPage1.addButtonCustom().click();
          /////////// PPPPPPPPRBLMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
          cy.get('body').then((body) => {
            if (body.text().includes('Oops! Something Went Wrong.')) {
              // if the paragraph with the text exists, click the refresh button
              cy.findByText('Refresh').parent().click();
            }
          });
          ///////////
          let keyword = 2;
          config.riskType[prop].forEach((element) => {
            earlyWarningsPage1.listSeverityKeyword(keyword).click();
            earlyWarningsPage1.severityKeyword(severity, element[1]).click();
            keyword++;
            severity++;
          });
          earlyWarningsPage1.finishButtonCustom().click();
        }
      }
    }
  }
  /*earlyWarningsPage1.saveButtonAsset().should(($btntest) => {
      expect($btntest).to.not.have.attr('disabled')
    }).click();*/
}
export default addAsset;
