<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-select
      v-model="value"
      :options="config.options"
      defaultLabel="请选择"
      :disabled="disabled || readonly"
      @update:modelValue="$emit('change', config.key, $event)"
    ></ui-select>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputSelect',
  mixins: [formItemMixin]
};
</script>
