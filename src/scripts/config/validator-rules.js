import { helpers } from 'balm-ui';

export default {
  required: {
    validate(value) {
      return !helpers.isEmpty(value);
    },
    message: '%s is required'
  },
  password: {
    validate(value) {
      return /^\w+$/.test(value);
    },
    message: '%s must be a letter, digit or underline'
  }
};
