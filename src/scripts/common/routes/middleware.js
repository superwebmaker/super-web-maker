import { useBus, useStore } from 'balm-ui';

export async function initRouter(router, isAdmin = false) {
  const bus = useBus();

  const defaultRouterName = isAdmin ? 'admin.index' : 'home';
  const loginRouterName = isAdmin ? 'admin.login' : 'login';

  router.beforeEach(async (to, from, next) => {
    const store = useStore();

    // NOTE: 检查权限
    if (!store.isAuthenticated) {
      await store.me();
    }

    if (to.matched.some((route) => route.meta.requiresAuth)) {
      if (store.isAuthenticated) {
        next();
      } else {
        next({ name: loginRouterName });
      }
    } else {
      if (store.isAuthenticated && to.name === loginRouterName) {
        next({ name: defaultRouterName });
      } else {
        next();
      }
    }
  });

  try {
    await router.isReady();
    // onSuccess
    bus.emit('router-ready');
  } catch (err) {
    // onError
    console.log('router-error', err);
    bus.emit('router-error', err.message);
  }

  // router.afterEach((to, from) => {
  //   if (to.name !== from.name) {
  //     setTimeout(function () {
  //       statistics();
  //     }, 250);
  //   }
  // });
}
