module.exports = (app) => {
  const { router, controller } = app;

  // Frontend
  router.get('/', controller.frontend.home.index);

  // Backend
  router.get('/admin', controller.backend.admin.index);

  // Auth
  const authApiRouter = router.namespace('/api/auth');

  authApiRouter.post('/login', controller.backend.auth.login);
  authApiRouter.post('/logout', controller.backend.auth.logout);
  authApiRouter.post('/refresh-token', controller.backend.auth.refresh);

  // Wxlogin
  router.post('/api/wxlogin', controller.api.test.wxlogin);
};
