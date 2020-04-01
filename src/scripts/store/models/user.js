import { getToken, saveToken } from '@/store/auth';

export default {
  data() {
    return {
      modules: [],
      user: null
    };
  },
  methods: {
    async getModules() {
      // let data = await this.$http.get('/modules');
    },
    async getUser() {
      if (getToken()) {
        let response = await this.$http.get('auth/me');
        if (response) {
          console.log(response);
        }
      } else {
        console.warn('unlogin');
      }

      return this.user;
    },
    async login(formData) {
      let { accessToken, expiresIn } = await this.$http.post(
        '/auth/login',
        formData
      );

      saveToken(accessToken);
    },
    async logout() {
      await this.$http.post('/auth/logout');

      this.user = null;
    }
  }
};
