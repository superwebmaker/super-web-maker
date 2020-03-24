import $http from 'axios';

export default {
  data() {
    return {
      modules: []
    };
  },
  methods: {
    async getModules() {
      let data = await $http.get('/users');

      console.log(data);
    }
  }
};
