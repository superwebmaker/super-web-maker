import { createApp } from 'vue';
import App from '@/backend/views/layouts/app';
import router from '@/backend/routes';
import http from '@/plugins/http';
import auth from '@/plugins/auth';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui-plus';
import validatorRules from '@/config/validator-rules';
import myStore from '@/backend/store';

function createBackendApp() {
  const app = createApp(App);

  app.use(router);
  app.use(http);
  app.use(auth);
  app.use(BalmUI, {
    $store: myStore,
    $validator: validatorRules
  });
  app.use(BalmUIPlus);

  app.mount('#app');
}

export default createBackendApp;
