const getConfig = require('./config/balmrc');
const publish = require('./config/balm.publish');

const api = (mix) => {
  if (mix.env.isProd) {
    publish(mix);
  } else {
    mix.copy('node_modules/balm-ui/fonts/*', 'src/fonts');
  }
};

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api
  };
};
