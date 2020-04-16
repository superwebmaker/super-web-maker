import Vue from 'vue';
import { DEBUG } from '@/config';
import dev from './models/dev';
import auth from './models/auth';

export default new Vue({
  name: 'store',
  mixins: [DEBUG ? dev : {}, auth]
});
