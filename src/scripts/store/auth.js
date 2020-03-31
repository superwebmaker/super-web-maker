const AUTH_TOKEN_NAME = 'SWM_token';

export const getToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN_NAME);
};

export const setToken = (token) => {
  window.localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const clearToken = (cb) => {
  window.localStorage.removeItem(AUTH_TOKEN_NAME);
  cb && cb();
};

export const needLogin = () => {
  window.location.href = '/admin';
};
