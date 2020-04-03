/* eslint-env node */
const balm = require('balm');
const config = require('./config/balmrc');
const superWebMakerServer = require('./config/balm.after-task');
const publish = require('./config/balm.publish');

balm.config = config;
balm.afterTask = superWebMakerServer;

balm.go((mix) => {
  publish(mix);
});
