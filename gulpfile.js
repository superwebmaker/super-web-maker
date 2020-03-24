/* eslint-env node */
const balm = require('balm');
const config = require('./config/balmrc');
const beforeTask = require('./config/balm.before-task');
const publish = require('./config/balm.publish');

balm.config = config;
balm.beforeTask = beforeTask;

balm.go((mix) => {
  publish(mix);
});
