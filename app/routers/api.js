module.exports = (app) => {
  const { router, controller, jwt } = app;
  const apiRouter = router.namespace('/api');

  apiRouter.get('/auth/me', jwt, controller.backend.auth.me);

  apiRouter.post('/send-mail', controller.api.mailer.send);

  apiRouter.resources('modules', '/modules', jwt, controller.api.module);
  apiRouter.resources('users', '/users', jwt, controller.api.user);
};
