import $http from 'axios';
import { getToken } from '@/store/auth';

export default {
  data() {
    return {
      modules: [],
      user: null
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getModules() {
      let data = await $http.get('/modules');
    },
    async getUser() {
      if (getToken()) {
        let response = await axios.get('user');
        if (response) {
          let result = response.data;
          if (result.code === 5000) {
            // TODO: 接口异常错误未处理，临时写在业务逻辑中，待修正接口
            localStorage.clear();
            window.location.reload();
          } else {
            let data = result.data;
            commit(types.USER_LOGIN, { data });
          }
        }
      } else {
        console.warn('unlogin');
      }
    }
  }
};
