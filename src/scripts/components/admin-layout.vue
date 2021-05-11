<template>
  <ui-top-app-bar content-selector=".app-content" :nav-icon="false">
    {{ title }}
    <template #toolbar>
      <template v-if="store.isAuthenticated">
        <ui-menu-anchor>
          <ui-fab
            extended
            icon="account_circle"
            @click="balmUI.onOpen('showUserMenu')"
          >
            <span>Welcome, {{ username }}!</span>
          </ui-fab>
          <ui-menu
            v-model="showUserMenu"
            :items="['Logout']"
            @selected="onSelectUserMenu"
          ></ui-menu>
        </ui-menu-anchor>
      </template>
      <p v-else>Welcome!</p>
    </template>
  </ui-top-app-bar>

  <div class="app-content">
    <ui-drawer v-show="store.isAuthenticated" viewport-height>
      <template v-if="store.isAuthenticated">
        <ui-drawer-header>
          <ui-drawer-title>Title</ui-drawer-title>
          <ui-drawer-subtitle>Subtitle</ui-drawer-subtitle>
        </ui-drawer-header>
        <ui-drawer-content>
          <template v-for="(menuitem, index) in menu" :key="index">
            <ui-collapse :model-value="index === 0">
              <template #toggle>{{ menuitem.title }}</template>
              <ui-nav>
                <template
                  v-for="(subMenuitem, subIndex) in menuitem.subMenu"
                  :key="subIndex"
                >
                  <router-link
                    v-slot="{ navigate, href, isActive }"
                    custom
                    :to="{ name: subMenuitem.url }"
                  >
                    <ui-nav-item
                      :href="href"
                      :active="isActive"
                      @click="navigate($event)"
                    >
                      {{ subMenuitem.title }}
                    </ui-nav-item>
                  </router-link>
                </template>
              </ui-nav>
            </ui-collapse>
          </template>
        </ui-drawer-content>
      </template>
    </ui-drawer>

    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvent, useBus, useStore } from 'balm-ui';
import { useAlert } from 'balm-ui-plus';
import menu from '@/backend/config/menu';

export default {
  name: 'AdminLayout',
  props: {
    title: {
      type: String,
      default: 'Super Web Maker'
    }
  },
  setup() {
    const state = reactive({
      routerReady: false,
      routerError: false,
      showUserMenu: false
    });

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
      ...toRefs(state),
      balmUI,
      store,
      username,
      menu
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
