import UiInputField from './input-field';

export default {
  components: {
    UiInputField
  },
  props: {
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    itemClass: {
      type: String,
      default: ''
    },
    subitemClass: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value:
        this.formData[this.config.key] !== undefined
          ? this.formData[this.config.key]
          : this.config.value
    };
  }
};
