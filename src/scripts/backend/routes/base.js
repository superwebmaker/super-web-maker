import AdminLayout from '@/common/views/layouts/blank';
import AdminLogin from '@/backend/views/login';
import AdminIndex from '@/backend/views/admin';
import AdminTest from '@/backend/views/test';

let baseRoutes = [
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirect: 'dashboard'
      },
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
