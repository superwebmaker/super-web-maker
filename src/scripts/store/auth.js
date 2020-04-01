const AUTH_TOKEN_NAME = 'SWM_token';

const noop = () => {};

export const getToken = () => {
  return window.localStorage.getItem(AUTH_TOKEN_NAME);
};

export const saveToken = (token) => {
  window.localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const destroyToken = (cb = noop) => {
  window.localStorage.removeItem(AUTH_TOKEN_NAME);
  cb();
};
