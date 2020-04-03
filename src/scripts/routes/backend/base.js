import AdminLayout from '@/views/layouts/blank';

import AdminLogin from '@/views/backend/login';
import AdminIndex from '@/views/backend/admin';
import AdminTest from '@/views/backend/test';

let baseRoutes = [
  {
    path: '/',
    component: AdminLayout,
    redirect: { name: 'admin.index' },
    children: [
      {
        path: 'dashboard',
        name: 'admin.index',
        component: AdminIndex
      },
      {
        path: 'test',
        name: 'admin.test',
        component: AdminTest
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: AdminLogin
  }
];

export default baseRoutes;
