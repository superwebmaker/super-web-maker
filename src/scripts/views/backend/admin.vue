<template>
  <div>
    <h2>Admin Index</h2>
    <p>User: {{ store.user }}</p>
  </div>
</template>

<script>
import { useStore } from 'balm-ui';

export default {
  name: 'AdminIndex',
  setup() {
    const store = useStore();

    console.log('hello');
    store.me();

    return {
      store
    };
  }
};
</script>
