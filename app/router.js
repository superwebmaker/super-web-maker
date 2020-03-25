const api = require('./routers/api');
const web = require('./routers/web');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  web(app);
  api(app);
};
