/**
 * jwt default config
 * @member Config#jwt
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  secret: '123456',
  enable: true,
  signOptions: {
    expiresIn: 60
  }
};
