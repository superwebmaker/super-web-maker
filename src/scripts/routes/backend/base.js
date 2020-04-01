import AdminLayout from '@/views/layouts/blank';

import AdminLogin from '@/views/backend/login';
import AdminIndex from '@/views/backend/admin';
import AdminTest from '@/views/backend/test';

import store from '@/store';

const adminBeforeEnter = async (to, from, next) => {
  const user = store.user || (await store.getUser());

  if (user) {
    to.name === 'admin.login'
      ? next({ name: 'admin.index' }, { replace: true })
      : next();
  } else {
    to.name === 'admin.login'
      ? next()
      : next({ name: 'admin.login' }, { replace: true });
  }
};

let baseRoutes = [
  {
    path: '/',
    component: AdminLayout,
    redirect: { name: 'admin.index' },
    beforeEnter: adminBeforeEnter,
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
    name: 'admin.login',
    component: AdminLogin,
    beforeEnter: adminBeforeEnter
  }
];

export default baseRoutes;
