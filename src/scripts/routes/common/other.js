import NotFound from '@/views/not-found';

let otherRoutes = [
  {
    path: '/:catchAll(.*)',
    component: NotFound
  }
];

export default otherRoutes;
