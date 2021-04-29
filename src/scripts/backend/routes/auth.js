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
      name: 'admin.users',
      component: Users
    },
    {
      path: 'user/:id?',
      name: 'admin.user',
      component: User
    },
    {
      path: 'user/:id/edit',
      name: 'admin.user.edit',
      component: User
    },
    {
      path: 'roles',
      name: 'admin.roles',
      component: Roles
    },
    {
      path: 'permissions',
      name: 'admin.permissions',
      component: Permissions
    },
    {
      path: 'menu',
      name: 'admin.menu',
      component: Menu
    },
    {
      path: 'logs',
      name: 'admin.logs',
      component: Logs
    }
  ],
  meta: { requiresAuth: true }
};
