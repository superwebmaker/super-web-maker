import AdminLayout from '@/common/views/layouts/blank';
import Login from '@/backend/views/login';
import Dashboard from '@/backend/views/dashboard';
import Test from '@/backend/views/test';
import authRoutes from './auth';

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
        component: Dashboard
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'admin.login',
    component: Login
  },
  {
    path: '/test',
    name: 'admin.test',
    component: Test
  }
];

export default [].concat(baseRoutes, authRoutes);
