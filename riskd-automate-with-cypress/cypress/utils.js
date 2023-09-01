export function translate() {
  let dictionary;
  if (Cypress.env('riskDetectionLanguage') === 'fr') {
    dictionary = require('../risk-management-fr.json');
  } else if (Cypress.env('riskDetectionLanguage') === 'en') {
    dictionary = require('../risk-management-en.json');
  }
  return dictionary;
}
export function parseNumber(str) {
  if (str.endsWith('K')) {
    // If the string ends with "K", remove the "K" suffix and multiply by 1000
    return parseFloat(str.slice(0, -1)) * 1000;
  } else if (str.endsWith('M')) {
    // If the string ends with "M", remove the "M" suffix and multiply by 1 million
    return parseFloat(str.slice(0, -1)) * 1000000;
  } else {
    // If the string does not have a valid suffix, return NaN
    return NaN;
  }
}
export function reportUrl(riskDetectionUrl, type, ID) {
  // get the parametres of the URL
  //get the value of the parameter 'topicId'
  const topicId = Cypress.env('topicRisk');
  //get the url without toppicId
  const baseUrl = riskDetectionUrl.split('?')[0];
  const reportAnalyz = `${baseUrl}/reports/${type}/${ID}?topicId=${topicId}`;
  return reportAnalyz;
}

//role:generate the name of warning
export function warningName(assetName, riskType) {
  let warningName1;
  if (riskType == 'Unusual big influencer') warningName1 = assetName + ' mentioned by unusual big influencers';
  else if (riskType == 'Custom Risk Terms') warningName1 = 'linked with ' + assetName;
  else if (riskType == 'Risk signaled by AI SENSE') warningName1 = ' linked with ' + assetName;
  return warningName1;
}
