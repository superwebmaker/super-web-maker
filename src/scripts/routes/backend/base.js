import AdminLayout from '@/views/layouts/blank';
import AdminIndex from '@/views/backend/admin';
import AdminLogin from '@/views/backend/login';
import store from '@/store';

let baseRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    redirect: { name: 'admin.index' },
    beforeEnter(to, from, next) {
      store.user ? next() : next({ name: 'admin.login', replace: true });
    },
    children: [
      {
        path: 'index',
        name: 'admin.index',
        component: AdminIndex,
        alias: '/admin'
      }
    ]
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: AdminLogin,
    beforeEnter(to, from, next) {
      store.user ? next({ name: 'admin.index', replace: true }) : next();
    }
  }
];

export default baseRoutes;
