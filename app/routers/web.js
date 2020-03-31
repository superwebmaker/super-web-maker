module.exports = (app) => {
  const { router, controller } = app;

  // Frontend
  router.get('/', controller.frontend.home.index);

  // Backend
  router.get('/admin', controller.backend.admin.index);
  router.post('/api/auth/login', controller.backend.auth.login);
  router.post('/api/auth/logout', controller.backend.auth.logout);
};
