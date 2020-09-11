/* eslint valid-jsdoc: "off" */
const path = require('path');
const sequelize = require('./plugins/sequelize');
const bcrypt = require('./plugins/bcrypt');
const jwt = require('./plugins/jwt');
const cors = require('./plugins/cors');
const wx = require('./plugins/wx');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    view: {
      root: [path.join(appInfo.baseDir, 'app/view')].join(','),
      defaultViewEngine: 'nunjucks',
      defaultExtension: '.nj'
    },
    static: {
      dir: ['css', 'js', 'img', 'font'].map((value) => {
        return {
          prefix: `/${value}`,
          dir: path.resolve(appInfo.baseDir, `app/public/${value}`)
        };
      })
    },
    sequelize
  });

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564709168697_8788';

  // add your middleware config here
  config.middleware = ['errorHandler']; // 'errorHandler' or 'error'

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 只对 /api 前缀的 url 路径生效
    // errorHandler: {
    //   match: '/api'
    // },
    // error: {
    //   // 这里使用 appInfo.env 来判断环境，仅仅在非生产环境下打开堆栈信息，用于调试
    //   postFormat: (e, { stack, ...rest }) =>
    //     appInfo.env === 'prod' ? rest : { stack, ...rest }
    // },
    bcrypt,
    jwt,
    cors,
    wx,
    security: {
      domainWhiteList: [] //'http://localhost:3000'
      // csrf: {
      //   enable: false
      // }
    }
  };

  return {
    ...config,
    ...userConfig
  };
};
