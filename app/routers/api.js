module.exports = (app) => {
  const { router, controller, jwt } = app;
  const apiRouter = router.namespace('/api');

  apiRouter.post('/auth/refresh-token', controller.backend.auth.refresh);
  apiRouter.get('/auth/me', controller.backend.auth.me);

  apiRouter.resources('modules', '/modules', jwt, controller.api.module);
  apiRouter.resources('users', '/users', jwt, controller.api.user);
};
