const getConfig = require('./config/balmrc');
const publish = require('./config/balm.publish');

const api = (mix) => {
  publish(mix);
};

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api
  };
};
