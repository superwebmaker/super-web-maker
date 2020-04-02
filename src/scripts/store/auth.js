const ACCESS_TOKEN = 'access_token'; // short lifetime
const REFRESH_TOKEN = 'refresh_token'; // long lifetime

const setToken = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const forceLogout = () => {
  clearToken();

  window.location = '/login';
};

export default {
  setToken,
  getAccessToken,
  getRefreshToken,
  clearToken,
  forceLogout
};
