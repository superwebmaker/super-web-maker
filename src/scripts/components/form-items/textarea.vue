<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :subitem-class="subitemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-textfield
      v-model="value"
      class="fullwidth"
      inputType="textarea"
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
  name: 'InputTextarea',
  mixins: [formItemMixin]
};
</script>
