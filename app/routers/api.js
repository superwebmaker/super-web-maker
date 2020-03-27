module.exports = (app) => {
  const { router, controller, jwt } = app;
  const apiRouter = router.namespace('/api');

  apiRouter.post('/refresh', controller.backend.admin.refresh);
  apiRouter.get('/me', controller.backend.admin.me);

  apiRouter.resources('modules', '/modules', jwt, controller.api.module);
  apiRouter.resources('users', '/users', jwt, controller.api.user);
};
