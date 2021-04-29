<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-form-field :class="subitemClass">
      <ui-switch
        v-model="value"
        :input-id="randomSwitchId"
        :disabled="readonly"
        @change="onChange"
      ></ui-switch>
      <label :for="randomSwitchId">{{ label }}</label>
    </ui-form-field>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';
import { generateRandomAlphaNum } from '@/utils';

export default {
  name: 'InputSwitch',
  mixins: [formItemMixin],
  computed: {
    randomSwitchId() {
      return `switch-item-${generateRandomAlphaNum(8)}`;
    },
    label() {
      const index = this.value ? 0 : 1;
      return this.config.options[index] && this.config.options[index].label;
    }
  },
  methods: {
    onChange($event) {
      this.$emit('change', this.config.key, $event);
    }
  }
};
</script>
