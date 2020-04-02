<template>
  <div class="container">
    <ui-top-app-bar contentSelector="#content-main" :navIcon="false">
      Super Web Maker
    </ui-top-app-bar>

    <div id="content-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      routerReady: false,
      routerError: false
    };
  },
  async created() {
    this.$bus.$on('router-ready', () => {
      this.routerReady = true;
    });

    this.$bus.$on('router-error', ({ message }) => {
      this.routerError = true;
      this.routerErrorMessage = message;
    });
  }
};
</script>
