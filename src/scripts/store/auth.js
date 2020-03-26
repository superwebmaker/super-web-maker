const AUTH_TOKEN_NAME = 'SWM_token';

export const getToken = () => {
  const token = window.localStorage.getItem(AUTH_TOKEN_NAME);
  if (!!token) {
    logout();
  }

  return token;
};

export const login = (token) => {
  if (!getToken()) {
    window.localStorage.setItem(AUTH_TOKEN_NAME, token);
    location.reload();
  }
};

export const logout = (cb) => {
  window.localStorage.removeItem(AUTH_TOKEN_NAME);
  cb && cb();
};

export const refreshToken = (token) => {
  window.localStorage.setItem(AUTH_TOKEN_NAME, token);
};

export const needLogin = () => {
  window.location.href = '/admin';
};
