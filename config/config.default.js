/* eslint valid-jsdoc: "off" */
const path = require('path');
const mongoose = require('./db-mongoose');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mongoose,
    view: {
      root: [path.join(appInfo.baseDir, 'app/view')].join(','),
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.nj'
    },
    static: {
      dir: ['css', 'js', 'img', 'font'].map(value => {
        return {
          prefix: `/${value}`,
          dir: path.resolve(appInfo.baseDir, `app/public/${value}`)
        };
      })
    }
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564709168697_8788';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
