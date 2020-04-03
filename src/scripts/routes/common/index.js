import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import bus from '@/store/bus';

const getRouter = (routes) => {
  Vue.use(VueRouter);

  const router = new VueRouter({
    mode: 'history',
    routes
  });

  router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      if (store.isAuthenticated) {
        next();
      } else {
        next({ name: 'login' });
      }
    } else {
      next();
    }
  });

  router.onReady(function () {
    bus.$emit('router-ready');
  });

  router.onError(function (e) {
    bus.$emit('router-error', JSON.parse(e.message));
  });

  // router.afterEach((to, from) => {
  //   if (to.name !== from.name) {
  //     setTimeout(function () {
  //       statistics();
  //     }, 250);
  //   }
  // });

  return router;
};

export default getRouter;
