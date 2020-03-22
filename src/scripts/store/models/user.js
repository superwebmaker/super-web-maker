import $http from 'axios';

export default {
  data() {
    return {
      menu: []
    };
  },
  methods: {
    async getMenu() {
      let response = await $http.get('/v2/topics');
      let { code, data, message } = response;

      if (code === 200) {
        this.menu = data;
      } else {
        alert(message);
      }
    }
  }
};
