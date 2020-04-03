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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);

      const { status } = error.response;

      if (status === 403) {
        return auth.forceLogout();
      }

      if (status !== 401) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;

      // NOTE: Stop going in an infinite loop
      if (status === 401 && originalRequest.url === '/auth/refresh-token') {
        $bus.router.push({ name: 'login' });
        return Promise.reject(error);
      }

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
          .then(({ status, data }) => {
            if (status === 201) {
              console.log('new token', data);
              auth.setToken(data);

              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${auth.getAccessToken()}`;

              $bus.$emit('refresh-token');

              return axios(originalRequest);
            }
          })
          .catch(() => {
            console.error('Unable to refresh access token');
            auth.forceLogout();
          });
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('Request Error');
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Unknown Error');
      console.log(error.message);
    }

    return Promise.reject(error);
  }
);

export default {
  install(Vue) {
    Vue.prototype.$http = axios;
  }
};
