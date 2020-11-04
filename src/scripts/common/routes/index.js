import { createRouter, createWebHistory } from 'vue-router';
import { initRouter } from './middleware';

const getRouter = (routes, base = '/') => {
  const history = createWebHistory();
  const router = createRouter({
    base,
    history,
    routes
  });

  initRouter(router);

  return router;
};

export default getRouter;
