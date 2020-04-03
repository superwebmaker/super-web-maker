import auth from '@/store/auth';
import $bus from '@/store/bus';

export default {
  data() {
    return {
      isAuthenticated: false,
      user: null
    };
  },
  methods: {
    async me() {
      const accessToken = auth.getAccessToken();
      if (accessToken) {
        let response = await this.$http.get('/users');
        if (response) {
          console.log(response);
          this.isAuthenticated = true;
        }
      } else {
        console.info('unlogin');
      }
    },
    async login(formData) {
      let data = await this.$http.post('/auth/login', formData);
      console.log('login token');
      auth.setToken(data);

      this.isAuthenticated = true;
      $bus.$emit('redirect', '/');
    },
    async logout() {
      await this.$http.post('/auth/logout');

      this.user = null;
    }
  }
};
