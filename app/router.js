/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/maker', controller.maker.index);
  router.get('/user', controller.user.index);
  router.get('/user/add', controller.user.add);
};
