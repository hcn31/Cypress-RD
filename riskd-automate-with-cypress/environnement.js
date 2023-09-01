const environments = {
  int: {
    qa: 'https://social.int.digimind.tech/app/intqa/riskDetection',
    gre: 'https://social.int.digimind.tech/d/intgre/connect.do',
  },
  local: {
    BDD: 'http://localhost/d/dev/connect.do',
  },
  dev: {
    BDD: 'https://social.dev.digimind.tech/d/dev/connect.do',
  },
  prod: {
    fh4: 'https://social.digimind.com/d/dh1/riskDetection/earlyWarnings?topicId=195',
    bx9: 'https://social.digimind.com/d/dh1/connect.do',
  },
  staging: {
    BDD: 'https://app.digimind.com/d/cd6/connect.do',
  },
};

function envRiskDetection(environmentRiskDetection, BDDRiskDetction) {
  return environments[environmentRiskDetection][BDDRiskDetction];
}
module.exports = envRiskDetection;
