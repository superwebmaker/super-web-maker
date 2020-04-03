module.exports = (app) => {
  const { router, controller, jwt } = app;
  const apiRouter = router.namespace('/api');

  apiRouter.get('/auth/me', jwt, controller.backend.auth.me);

  apiRouter.resources('modules', '/modules', jwt, controller.api.module);
  apiRouter.resources('users', '/users', jwt, controller.api.user);
};
