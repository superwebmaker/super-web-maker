module.exports = (app) => {
  const { router, controller } = app;

  // Frontend
  router.get('/', controller.frontend.home.index);

  // Backend
  const adminRouter = router.namespace('/admin');

  adminRouter.get('/', controller.backend.admin.index);
  adminRouter.post('/login', controller.backend.admin.login);
  // adminRouter.post('/logout', controller.backend.admin.logout);
  // adminRouter.post('/refresh', controller.backend.admin.refresh);
  adminRouter.post('/me', controller.backend.admin.me);
};
