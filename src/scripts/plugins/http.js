import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { useBus } from 'balm-ui';
import { useAuth } from '@/plugins/auth';
import { API_ENDPOINT } from '@/config';
import API from '@/config/api';

const bus = useBus();
const auth = useAuth();

const statusCodes = {
  OK: 200,
  Created: 201,
  NoContent: 204,
  Unauthorized: 401,
  Forbidden: 403
};
// For RESTful API
const successStatusCode = [
  statusCodes.OK,
  statusCodes.Created,
  statusCodes.NoContent
];

const errorHandler = ({ message }) => {
  bus.emit('on-error', message);
};

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.headers['X-CSRF-TOKEN'] = Cookies.get('csrfToken');

axios.interceptors.request.use(
  (config) => {
    const accessToken = auth.getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const { status, data, message, config } = response;

    if (successStatusCode.includes(status)) {
      if (config.url === API.login) {
        auth.setToken(data);

        bus.emit('auth-token');
      }

      return Promise.resolve(data);
    } else {
      errorHandler({ message });

      return Promise.reject({ status, message });
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

      if (status === statusCodes.Forbidden) {
        return auth.forceLogout();
      }

      if (status !== statusCodes.Unauthorized) {
        errorHandler(error.response.data); // NOTE: 处理各种业务逻辑错误

        return Promise.reject(error);
      }

      const originalRequest = error.config;

      // NOTE: Stop going in an infinite loop
      if (
        status === statusCodes.Unauthorized &&
        originalRequest.url === API.refreshToken
      ) {
        const router = useRouter();
        router.push({ name: 'login' });

        return Promise.reject(error);
      }

      if (status === statusCodes.Unauthorized && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = auth.getRefreshToken();
        if (!refreshToken) {
          return auth.forceLogout();
        }

        return axios
          .post(API.refreshToken, {
            token: refreshToken
          })
          .then((data) => {
            // NOTE: 已处理过 response，直接返回 data
            auth.setToken(data);

            const newAccessToken = `Bearer ${auth.getAccessToken()}`;
            originalRequest.headers['Authorization'] = newAccessToken;
            axios.defaults.headers.common['Authorization'] = newAccessToken;

            bus.emit('auth-token');

            return axios(originalRequest);
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

const useHttp = () => axios;

export default {
  install(app) {
    app.config.globalProperties.$http = axios;
    app.provide('http', axios);
  }
};
export { useHttp };
