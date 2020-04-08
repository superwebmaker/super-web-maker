const koajwt = require('koa-jwt2');
const UnauthorizedError = require('koa-jwt2/lib/errors/UnauthorizedError');
const jwt = require('jsonwebtoken');

const JWT = Symbol('Application#jwt');

module.exports = {
  generateToken(payload, secret, options, callback) {
    const config = this.config.jwt;

    const jwtSignOptions = Object.assign(
      {},
      config.signOptions || {},
      options // contains `options.jwtid`
    );

    return jwt.sign(payload, secret, jwtSignOptions, callback);
  },
  get jwt() {
    if (!this[JWT]) {
      const config = this.config.jwt;
      this[JWT] = koajwt(config);

      this[JWT].sign = (payload, secret, options, callback) => {
        if (typeof secret !== 'string') {
          callback = options;
          options = secret || {};
          secret = config.secret;
        } else if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        return this.generateToken(payload, secret, options, callback);
      };

      // this[JWT].verify = (token, secret, options) => {
      //   return jwt.verify(
      //     token,
      //     secret,
      //     Object.assign({}, config.verifyOptions || {}, options)
      //   );
      // };

      this[JWT].refresh = (token, secret, options, callback) => {
        if (typeof secret !== 'string') {
          callback = options;
          options = secret || {};
          secret = config.secret;
        } else if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        const payload = jwt.verify(
          token,
          secret,
          Object.assign({}, config.verifyOptions || {}, options)
        );
        delete payload.iat;
        delete payload.exp;
        delete payload.nbf;
        delete payload.jti; // We are generating a new token, if you are using jwtid during signing, pass it in options

        return this.generateToken(payload, secret, options, callback);
      };

      this[JWT].decode = jwt.decode;
      this[JWT].UnauthorizedError = UnauthorizedError;
    }

    return this[JWT];
  }
};
