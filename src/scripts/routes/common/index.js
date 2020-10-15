import { createRouter, createWebHashHistory } from 'vue-router';
import { initRouter } from './middleware';

const getRouter = (routes) => {
  const history = createWebHashHistory();
  const router = createRouter({
    history,
    routes
  });

  initRouter(router);

  return router;
};

export default getRouter;
