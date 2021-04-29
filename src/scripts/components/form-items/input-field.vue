<template>
  <ui-form-field
    :class="[
      itemClass,
      'yb-input-field',
      `yb-input-field--${config.type}`,
      { required: config.required }
    ]"
  >
    <label>{{ config.label }}</label>
    <slot></slot>
  </ui-form-field>
</template>

<script>
export default {
  name: 'UiInputField',
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
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
