<template>
  <div class="container">
    <ui-top-app-bar contentSelector="#content-main" :navIcon="false">
      Hello Super Web Maker
    </ui-top-app-bar>

    <div id="content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useBus } from 'balm-ui';

const state = reactive({
  routerReady: false,
  routerError: false
});

export default {
  name: 'WebApp',
  setup() {
    const bus = useBus();

    onBeforeMount(() => {
      bus.on('router-ready', () => {
        state.routerReady = true;
      });

      bus.on('router-error', (message) => {
        state.routerError = true;
        state.routerErrorMessage = message;
      });
    });

    return {
      ...toRefs(state)
    };
  }
};
</script>
