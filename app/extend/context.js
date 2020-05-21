const bcrypt = require('bcryptjs');

module.exports = {
  async genHash(plainText, rounds = this.app.config.bcrypt.saltRounds) {
    const salt = await bcrypt
      .genSalt(rounds)
      .catch((err) => this.app.logger.error('[bcrypt]', err));

    const hash = await bcrypt
      .hash(plainText, salt)
      .catch((err) => this.app.logger.error('[bcrypt]', err));

    return hash;
  },
  async compareHash(plainText, hash) {
    return await bcrypt
      .compare(plainText, hash)
      .catch((err) => this.app.logger.error('[bcrypt]', err));
  }
};
