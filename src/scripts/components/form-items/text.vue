<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-textfield
      v-model="value"
      :placeholder="config.placeholder || ' '"
      :disabled="disabled"
      :maxlength="config.maxlength || null"
      :with-counter="!!config.maxlength"
      :attrs="{ readonly }"
      @update:modelValue="$emit('change', config.key, $event)"
    ></ui-textfield>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputText',
  mixins: [formItemMixin]
};
</script>
