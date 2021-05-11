<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-textfield
      v-if="readonly"
      v-model="value"
      :placeholder="config.placeholder || ' '"
      :disabled="disabled"
      :attrs="{ readonly }"
    ></ui-textfield>
    <ui-datepicker
      v-else
      v-model="value"
      :config="pickerConfig"
      :placeholder="config.placeholder || ' '"
      :disabled="disabled"
      @update:modelValue="$emit('change', config.key, $event)"
    ></ui-datepicker>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputDatepicker',
  mixins: [formItemMixin],
  data() {
    return {
      pickerConfig: {
        // locale: this.$pickerLang
      }
    };
  }
};
</script>
