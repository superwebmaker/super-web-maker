<template>
  <div class="page--login">
    <h2>Admin Login</h2>

    <div v-if="store.user">
      <p>{{ store.user }}</p>
      <ui-button @click="store.logout">Logout</ui-button>
    </div>
    <login v-else></login>
  </div>
</template>

<script>
import { useStore } from 'balm-ui';
import Login from '@/components/login';

export default {
  name: 'AdminLogin',
  components: {
    Login
  },
  setup() {
    const store = useStore();

    return {
      store
    };
  }
};
</script>
