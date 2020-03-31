import { getToken, setToken } from '@/store/auth';

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
        let response = await this.$http.get('/users');
        // if (response) {
        //   let result = response.data;
        //   if (result.code === 5000) {
        //     // TODO: 接口异常错误未处理，临时写在业务逻辑中，待修正接口
        //     localStorage.clear();
        //     window.location.reload();
        //   } else {
        //     let data = result.data;
        //     commit(types.USER_LOGIN, { data });
        //   }
        // }
      } else {
        console.warn('unlogin');
      }
    },
    async login(formData) {
      let { accessToken, expiresIn } = await this.$http.post(
        '/auth/login',
        formData
      );

      setToken(accessToken);

      this.getUser();
    },
    async logout() {
      await this.$http.post('/auth/logout');

      this.user = null;
    }
  }
};
