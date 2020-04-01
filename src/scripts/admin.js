import Vue from 'vue';
import App from '@/views/layouts/backend';
import router from '@/routes/backend';
import $bus from '@/plugins/$bus';
import $http from '@/plugins/$http';
import $store from '@/plugins/$store';

import BalmUI from 'balm-ui';

Vue.config.productionTip = false;
Vue.use($bus);
Vue.use($http);
Vue.use($store);

Vue.use(BalmUI);

new Vue({
  el: '#app',
  components: { App },
  template: '<app/>',
  router
});
