import { reactive, toRefs } from 'vue';
import { useBus } from 'balm-ui';
import auth from '@/store/auth';
import API from '@/config/api';
import useHttp from '@/plugins/http';

const bus = useBus();
const $http = useHttp();

const state = reactive({
  isAuthenticated: false,
  user: null
});

async function me() {
  const hasAccessToken = !!auth.getAccessToken();

  // NOTE: 检查权限
  if (hasAccessToken) {
    if (!state.user) {
      let user = await $http.get('/auth/me');
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    }
  } else {
    console.info('unlogin');
  }
}

async function login(formData) {
  await $http.post(API.login, formData);
  bus.$emit('redirect', '/');
}

async function logout() {
  let { url } = await $http.post(API.logout);

  state.isAuthenticated = false;
  state.user = null;
  auth.clearToken();

  if (url) {
    bus.$emit('redirect', url);
  }
}

const useAuthStore = () => {
  return {
    ...toRefs(state),
    me,
    login,
    logout
  };
};

export default useAuthStore;
