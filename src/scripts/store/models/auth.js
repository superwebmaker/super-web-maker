import auth from '@/store/auth';
import bus from '@/store/bus';
import API from '@/config/api';

export default {
  data() {
    return {
      isAuthenticated: false,
      user: null
    };
  },
  methods: {
    async me() {
      const hasAccessToken = !!auth.getAccessToken();

      // NOTE: 检查权限
      if (hasAccessToken) {
        if (!this.user) {
          let user = await this.$http.get('/auth/me');
          if (user) {
            this.user = user;
            this.isAuthenticated = true;
          }
        }
      } else {
        console.info('unlogin');
      }
    },
    async login(formData) {
      await this.$http.post(API.login, formData);
      bus.$emit('redirect', '/');
    },
    async logout() {
      let { url } = await this.$http.post(API.logout);

      this.isAuthenticated = false;
      this.user = null;
      auth.clearToken();

      if (url) {
        bus.$emit('redirect', url);
      }
    }
  }
};
