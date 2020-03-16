const balm = require('balm');
const config = require('./config/balmrc');
const beforeTask = require('./config/before-task');

balm.config = config;
balm.beforeTask = beforeTask;

balm.go();
