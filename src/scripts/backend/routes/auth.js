import AdminLayout from '@/common/views/layouts/blank';
import Users from '@/backend/views/admin/users';
import User from '@/backend/views/admin/user';
import Roles from '@/backend/views/admin/roles';
import Permissions from '@/backend/views/admin/permissions';
import Menu from '@/backend/views/admin/menu';
import Logs from '@/backend/views/admin/logs';

export default {
  path: '/auth',
  component: AdminLayout,
  children: [
    {
      path: '',
      redirect: 'users'
    },
    {
      path: 'users',
      name: 'auth.users',
      component: Users
    },
    {
      path: 'user/:id?',
      name: 'auth.user',
      component: User
    },
    {
      path: 'user/:id/edit',
      name: 'auth.user.edit',
      component: User
    },
    {
      path: 'roles',
      name: 'auth.roles',
      component: Roles
    },
    {
      path: 'permissions',
      name: 'auth.permissions',
      component: Permissions
    },
    {
      path: 'menu',
      name: 'auth.menu',
      component: Menu
    },
    {
      path: 'logs',
      name: 'auth.logs',
      component: Logs
    }
  ],
  meta: { requiresAuth: true }
};
