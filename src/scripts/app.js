import { createApp } from 'vue';
import App from '@/views/layouts/frontend';
import router from '@/routes/frontend';
import http from '@/plugins/http';
import BalmUI from 'balm-ui';
import myStore from '@/store';

const app = createApp(App);

app.use(router);
app.use(http);
app.use(BalmUI, {
  $store: myStore
});

app.mount('#app');
