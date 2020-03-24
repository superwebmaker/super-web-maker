/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.resources('modules', '/api/core/modules', controller.core.modules);
  router.resources('users', '/api/users', controller.users);
};
