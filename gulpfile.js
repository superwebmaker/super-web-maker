/* eslint-env node */
const balm = require('balm');
const config = require('./config/balmrc');
const beforeTask = require('./config/before-task');
const publish = require('./config/publish');

balm.config = config;
balm.beforeTask = beforeTask;

balm.go((mix) => {
  publish(mix);
});
