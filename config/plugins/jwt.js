/**
 * jwt default config
 * @member Config#jwt
 * @property {String} SOME_KEY - some description
 */
module.exports = {
  secret: '123456',
  enable: true,
  sign: {
    expiresIn: 60000 // '7d'
  }
};
