import axios from 'axios';
import Cookies from 'js-cookie';
import $bus from '@/store/bus';
import auth from '@/store/auth';
import { API_ENDPOINT } from '@/config';
import API from '@/config/api';

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.headers['X-CSRF-TOKEN'] = Cookies.get('csrfToken');

const errorHandler = ({ status, message }) => {
  $bus.alert(message);
};

axios.interceptors.request.use(
  (config) => {
    const token = auth.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    const { config, status } = error.response;

    if (config.url.includes('/login')) {
      return Promise.reject(error);
    }

    if (status === 403) {
      return auth.forceLogout();
    }

    if (status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // if (
    //   status === 401 &&
    //   originalRequest.url === 'http://13.232.130.60:8081/v1/auth/token'
    // ) {
    //   $bus.router.push({ name: 'login' });
    //   return Promise.reject(error);
    // }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = auth.getRefreshToken();
      if (!refreshToken) {
        return auth.forceLogout();
      }

      return axios
        .post(API.refreshToken, {
          token: refreshToken
        })
        .then((response) => {
          if (response.status === 201) {
            // console.log('new token', response.data);
            auth.setToken(response.data);

            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${auth.getAccessToken()}`;

            return axios(originalRequest);
          }
        })
        .catch(() => {
          console.error('Unable to refresh access token');
          auth.forceLogout();
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
