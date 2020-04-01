import axios from 'axios';
import Cookies from 'js-cookie';
import $bus from '@/store/bus';
import { getToken, saveToken, destroyToken } from '@/store/auth';

axios.defaults.baseURL = '/api';
axios.defaults.headers['X-CSRF-TOKEN'] = Cookies.get('csrfToken');

const errorHandler = ({ status, message }) => {
  $bus.alert(message);
};

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { status, data, message } = response;

    if (status !== 200) {
      errorHandler({ status, message });
      return Promise.reject({ status, message });
    } else {
      return Promise.resolve(data);
    }
  },
  function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getToken();
      return axios
        .post('/auth/refresh-token', {
          token: refreshToken
        })
        .then((response) => {
          if (response.status === 201) {
            const newAccessToken = response.data.accessToken;
            saveToken(newAccessToken);
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${getToken()}`;
            // originalRequest.baseURL = ''; // url已经带上了 `/api`，避免出现 `/api/api` 的情况
            return axios(originalRequest);
          }
        })
        .catch((response) => {
          console.error('refreshtoken error =>', response);
          // 刷新 token 失败，神仙也救不了了，跳转到首页重新登录吧
          $bus.router.push('/login');
        });
    }
    return Promise.reject(error);
  }
);

export default {
  install(Vue) {
    Vue.prototype.$http = axios;
  }
};
