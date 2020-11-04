import NotFound from '@/common/views/not-found';

let otherRoutes = [
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default otherRoutes;
