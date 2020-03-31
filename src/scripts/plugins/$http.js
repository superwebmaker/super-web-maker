import axios from 'axios';
import Cookies from 'js-cookie';
// import $bus from '@/store/bus';
import { getToken, clearToken, setToken, needLogin } from '@/store/auth';
import {
  UNLOGIN,
  NO_AUTHENTICATE,
  TOKEN_HAS_EXPIRED,
  TOKEN_BLACKLIST
} from '@/config';

axios.defaults.baseURL = '/api';
axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('csrfToken');

const errorHandler = ({ status, data }) => {
  if (data && data.message) {
    console.log(status, data.message);
  }
};

axios.interceptors.request.use(
  (config) => {
    // config.headers.common['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const AUTH_TOKEN = getToken();
if (AUTH_TOKEN) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

  // axios.interceptors.request.use(
  //   (config) => {
  //     config.headers.Authorization = AUTH_TOKEN;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  axios.interceptors.response.use(
    (response) => {
      // intercept the global error
      const { status, data, message } = response;

      if (status !== 200) {
        alert(message);
        return Promise.reject({ status, message });
      } else {
        return Promise.resolve(data);
      }
    },
    (error) => {
      let result;
      let originalRequest = error.config;

      if (!originalRequest._retry) {
        originalRequest._retry = true; // now it can be retried

        switch (error.response.status) {
          case 401:
            result = axios
              .post('/auth/refresh-token')
              .then((response) => {
                let { status, data } = response.data;
                if (status === 200) {
                  const NEW_AUTH_TOKEN = data.accessToken;
                  setToken(NEW_AUTH_TOKEN); // save to localStorage

                  originalRequest.baseURL = '/api'; // fix baseURL
                  originalRequest.headers.Authorization = `Bearer ${NEW_AUTH_TOKEN}`; // new header new token

                  axios.defaults.headers.common[
                    'Authorization'
                  ] = `Bearer ${NEW_AUTH_TOKEN}`; // refresh for old request

                  window.location.reload(); // Token 过期后刷新页面重新请求全部接口

                  return axios(originalRequest); // retry the request that errored out
                } else {
                  // Token 刷新失败的处理
                  delete axios.defaults.headers.common['Authorization'];
                  clearToken(window.location.reload);
                }
              })
              .catch((error) => {
                // for (let i = 0; i < error.response.data.errors.length; i++) {
                //   if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
                //     clearToken();
                //     return;
                //   }
                // }
              });
            break;
          case 404:
            window.location.href = '/';
            break;
        }

        return result;
      }

      // if (errorCode === TOKEN_BLACKLIST) {
      //   clearToken(window.location.reload);
      //   return;
      // }

      errorHandler(error.response);

      // Do something with response error
      return Promise.reject(error);
    }
  );
} else {
  // 未登录状态错误处理
  axios.interceptors.response.use(
    (response) => {
      // intercept the global error
      const { status, data, message } = response;

      if (status !== 200) {
        alert(message);
        return Promise.reject({ status, message });
      } else {
        return Promise.resolve(data);
      }
    },
    (error) => {
      let errorCode = error.response.data.code;
      // console.info('unlogin', errorCode);

      if (errorCode === UNLOGIN || errorCode === NO_AUTHENTICATE) {
        needLogin();
        return;
      } else {
        errorHandler(error.response);
      }

      return Promise.reject(error);
    }
  );
}

export default {
  install(Vue) {
    Vue.prototype.$http = axios;
  }
};
