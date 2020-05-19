import Vue from 'vue';
import App from '@/views/layouts/backend';
import router from '@/routes/backend';
import $bus from '@/plugins/$bus';
import $http from '@/plugins/$http';
import $store from '@/plugins/$store';

import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
import validatorRules from './config/validator-rules';

Vue.config.productionTip = false;
Vue.use($bus);
Vue.use($http);
Vue.use($store);

Vue.use(BalmUI);
Vue.use(BalmUIPlus, { validator: validatorRules });

new Vue({
  el: '#app',
  components: { App },
  template: '<app/>',
  router
});
