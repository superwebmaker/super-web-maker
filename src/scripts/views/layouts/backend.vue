<template>
  <div class="container">
    <ui-top-app-bar contentSelector="#content-main" :navIcon="false">
      Super Web Maker
      <template #toolbar>
        <template v-if="$store.isAuthenticated">
          <ui-menu-anchor>
            <ui-icon @click="$balmUI.onOpen('showUserMenu')"
              >account_circle</ui-icon
            >
            <ui-menu
              v-model="showUserMenu"
              :items="[
                'Back',
                'Forward',
                'Reload',
                '-',
                'Help &amp; Feedback',
                'Logout'
              ]"
              @selected="onSelectUserMenu"
            ></ui-menu>
          </ui-menu-anchor>
          <span>Welcome,{{ username }}!</span>
        </template>
        <p v-else>Welcome!</p>
      </template>
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
      routerError: false,
      showUserMenu: false
    };
  },
  computed: {
    username() {
      return this.$store.user ? this.$store.user.name : 'New User';
    }
  },
  async created() {
    this.$bus.$on('router-ready', () => {
      this.routerReady = true;
    });

    this.$bus.$on('router-error', ({ message }) => {
      this.routerError = true;
      this.routerErrorMessage = message;
    });

    this.$bus.$on('auth-token', () => {
      this.$store.isAuthenticated = true;
    });

    this.$bus.$on('redirect', (url) => {
      this.$router.push(url);
    });

    this.$bus.$on('on-error', (error) => {
      if (this.$route.name !== 'login') {
        this.$bus.$alert(error);
      }
    });
  },
  methods: {
    onSelectUserMenu({ label }) {
      if (label === 'Logout') {
        this.$store.logout();
      }
    }
  }
};
</script>
