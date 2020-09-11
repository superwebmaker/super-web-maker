const config = require('./config/balmrc');
const getAfterTask = require('./config/balm.after-task');
const publish = require('./config/balm.publish');

const api = (mix) => {
  publish(mix);
};

module.exports = (balm) => {
  return {
    config,
    api,
    afterTask: getAfterTask(balm)
  };
};
