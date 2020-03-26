import Vue from 'vue';
import VueRouter from 'vue-router';
import frontendBaseRoutes from './frontend/base';
import backendBaseRoutes from './backend/base';
import NotFound from '@/views/not-found';

Vue.use(VueRouter);

let routes = [].concat(frontendBaseRoutes, backendBaseRoutes, [
  {
    path: '*',
    component: NotFound
  }
]);

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
