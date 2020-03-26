import axios from 'axios';
import $bus from '@/store/bus';
import { getToken, logout, refreshToken, needLogin } from '@/store/auth';
import {
  UNLOGIN,
  NO_AUTHENTICATE,
  TOKEN_HAS_EXPIRED,
  TOKEN_BLACKLIST
} from '@/config';

axios.defaults.baseURL = '/api';

const errorHandler = (errorResponse) => {
  if (errorResponse.data && errorResponse.data.message) {
    $bus.$alert(errorResponse.data.message);
  }
};

const AUTH_TOKEN = getToken();
if (AUTH_TOKEN) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  // axios.defaults.headers.post['Content-Type'] =
  //   'application/x-www-form-urlencoded';

  axios.interceptors.response.use(
    (response) => {
      // intercept the global error
      return response;
    },
    (error) => {
      let errorCode = error.response.data.code;
      // console.info('login', errorCode);

      let originalRequest = error.config;
      if (errorCode === TOKEN_HAS_EXPIRED && !originalRequest._retry) {
        // if the error is 401 and hasent already been retried
        originalRequest._retry = true; // now it can be retried
        return axios
          .get('auth/refresh-token', null)
          .then((response) => {
            let { status, data } = response.data;
            if (status) {
              const NEW_AUTH_TOKEN = data.token;
              refreshToken(NEW_AUTH_TOKEN); // save to localStorage

              originalRequest.baseURL = '/api'; // fix baseURL
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${NEW_AUTH_TOKEN}`; // new header new token

              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${NEW_AUTH_TOKEN}`; // refresh for old request

              window.location.reload(); // Token 过期后刷新页面重新请求全部接口

              return axios(originalRequest); // retry the request that errored out
            } else {
              // Token 刷新失败的处理
              delete axios.defaults.headers.common['Authorization'];
              logout(window.location.reload);
            }
          })
          .catch((error) => {
            for (let i = 0; i < error.response.data.errors.length; i++) {
              if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
                logout();
                return;
              }
            }
          });
      }

      if (error.response.status === 404 && !originalRequest._retry) {
        originalRequest._retry = true;
        window.location.href = '/';
        return;
      }

      if (errorCode === TOKEN_BLACKLIST) {
        logout(window.location.reload);
        return;
      }

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
      return response;
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
