require('dotenv').config();
const { defineConfig } = require('cypress');
const envRiskDetection = require('./environnement');
const {
  loginRisk,
  passwordRisk,
  topicIdRisk,
  languageRisk,
  environmentRiskDetection,
  BDDRiskDetction,
  screenShots,
} = process.env;
const urlRisk = envRiskDetection(environmentRiskDetection, BDDRiskDetction);
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //for html reps
  env: {
    riskDetectionUrl: `${urlRisk}?topicId=${topicIdRisk}`,
    topicRisk: topicIdRisk,
    riskDetectionLogin: loginRisk,
    riskDetectionPassword: passwordRisk,
    riskDetectionLanguage: languageRisk,
    TAKESCREENSHOTS: 'false',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); //for html reps
    },
  },
});
