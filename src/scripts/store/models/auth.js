export default {
  data() {
    return {
      isAuthenticated: false,
      user: null
    };
  },
  methods: {
    async auth() {
      // let response = await this.$http.get('auth/me');
      // if (response) {
      //   console.log(response);
      // }
      // this.isAuthenticated = true;
    },
    async login(formData) {
      let { accessToken, expiresIn } = await this.$http.post(
        '/auth/login',
        formData
      );
    },
    async logout() {
      await this.$http.post('/auth/logout');

      this.user = null;
    }
  }
};
