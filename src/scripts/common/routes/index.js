import { createRouter, createWebHistory } from 'vue-router';
import { initRouter } from './middleware';

const getRouter = (routes, base = '/', isAdmin = false) => {
  const history = createWebHistory();
  const router = createRouter({
    base,
    history,
    routes
  });

  initRouter(router, isAdmin);

  return router;
};

export default getRouter;
