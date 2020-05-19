import { types } from 'balm-ui/dist/balm-ui-plus';

export default {
  required: {
    validate(value) {
      let result = false;
      if (types.isString(value)) {
        result = value.trim() !== '';
      } else if (types.isArray(value)) {
        return value.length;
      } else {
        result = value;
      }
      return result;
    },
    message: '%s is required'
  },
  password: {
    validate(value) {
      return /^\w+$/.test(value);
    },
    message: 'Invalid password: must be a letter, digit or underline'
  }
};
