import getRouter from '@/routes/common';
import NotFound from '@/views/not-found';
import baseRoutes from './base';

let routes = [].concat(baseRoutes, [
  {
    path: '*',
    component: NotFound
  }
]);

export default getRouter(routes);
