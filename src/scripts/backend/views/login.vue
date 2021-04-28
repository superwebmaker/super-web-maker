<template>
  <div class="page--login">
    <h2>Admin Login</h2>

    <div v-if="store.user">
      <p>{{ store.user }}</p>
      <ui-button @click="store.logout">Logout</ui-button>
    </div>
    <ui-login v-else></ui-login>
  </div>
</template>

<script>
import { useStore } from 'balm-ui';
import UiLogin from '@/components/login';

export default {
  name: 'AdminLogin',
  components: {
    UiLogin
  },
  setup() {
    const store = useStore();

    return {
      store
    };
  }
};
</script>
