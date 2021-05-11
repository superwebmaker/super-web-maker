<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-textfield
      v-model="value"
      input-type="number"
      :placeholder="config.placeholder || ' '"
      :min="config.min"
      :disabled="disabled"
      :attrs="{ readonly }"
      @update:modelValue="$emit('change', config.key, $event)"
    ></ui-textfield>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputNumber',
  mixins: [formItemMixin]
};
</script>
