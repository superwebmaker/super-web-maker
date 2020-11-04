<template>
  <div class="container">
    <ui-top-app-bar contentSelector="#content-main" :navIcon="false">
      Super Web Maker
      <template #toolbar>
        <template v-if="store.isAuthenticated">
          <ui-menu-anchor>
            <ui-icon @click="balmUI.onOpen('showUserMenu')"
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
import { reactive, toRefs, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvent, useBus, useStore } from 'balm-ui';
import { useAlert } from 'balm-ui-plus';

const state = reactive({
  routerReady: false,
  routerError: false,
  showUserMenu: false
});

export default {
  name: 'AdminApp',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const balmUI = useEvent();
    const bus = useBus();
    const store = useStore();
    const $alert = useAlert();

    const username = computed(() =>
      store.user ? store.user.name : 'New User'
    );

    onBeforeMount(() => {
      bus.on('router-ready', () => {
        state.routerReady = true;
      });

      bus.on('router-error', ({ message }) => {
        state.routerError = true;
        state.routerErrorMessage = message;
      });

      bus.on('auth-token', () => {
        store.isAuthenticated = true;
      });

      bus.on('redirect', (url) => {
        router.push(url);
      });

      bus.on('on-error', (error) => {
        if (route.name !== 'login') {
          $alert(error);
        }
      });
    });

    return {
      balmUI,
      store,
      ...toRefs(state),
      username
    };
  },
  methods: {
    onSelectUserMenu({ text }) {
      if (text === 'Logout') {
        this.store.logout();
      }
    }
  }
};
</script>
