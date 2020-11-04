import { createApp } from 'vue';
import App from '@/frontend/views/layouts/app';
import router from '@/frontend/routes';
import http from '@/plugins/http';
import BalmUI from 'balm-ui';
import myStore from '@/frontend/store';

function createFrontendApp() {
  const app = createApp(App);

  app.use(router);
  app.use(http);
  app.use(BalmUI, {
    $store: myStore
  });

  app.mount('#app');
}

export default createFrontendApp;
