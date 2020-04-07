/**
 * jwt default config
 * @member Config#jwt
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  secret: '123456',
  enable: true,
  signOptions: {
    expiresIn: 60 // '15min'
  },
  refreshTokenExpiresIn: '10min' // '7d'
  // ignore: '/api/auth/refresh-token'
};
