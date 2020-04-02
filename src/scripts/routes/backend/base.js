import AdminLayout from '@/views/layouts/blank';

import AdminLogin from '@/views/backend/login';
import AdminIndex from '@/views/backend/admin';
import AdminTest from '@/views/backend/test';

import { ifAuthenticated, ifNotAuthenticated } from './auth';

let baseRoutes = [
  {
    path: '/',
    component: AdminLayout,
    redirect: { name: 'admin.index' },
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: 'index',
        name: 'admin.index',
        component: AdminIndex,
        alias: '/'
      },
      {
        path: 'test',
        name: 'admin.test',
        component: AdminTest
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: AdminLogin,
    beforeEnter: ifNotAuthenticated
  }
];

export default baseRoutes;
