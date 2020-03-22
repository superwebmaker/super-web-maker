import Vue from 'vue';
import VueRouter from 'vue-router';
// import VueMeta from 'vue-meta';
import baseRoutes from './base';
import aboutRoutes from './about';

Vue.use(VueRouter);
// Vue.use(VueMeta);

let routes = baseRoutes.concat(aboutRoutes);

const router = new VueRouter({
  routes
});

export default router;
