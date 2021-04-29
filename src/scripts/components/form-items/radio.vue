<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div :class="subitemClass">
      <ui-form-field
        v-for="(option, index) in config.options"
        :key="`${config.key}-box-${index}`"
      >
        <ui-radio
          v-model="value"
          :input-id="`${config.key}-${index}`"
          :name="config.key"
          :value="option.value"
          :disabled="disabled || readonly"
          @change="$emit('change', config.key, $event)"
        ></ui-radio>
        <label :for="`${config.key}-${index}`">{{ option.label }}</label>
      </ui-form-field>
    </div>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputRadio',
  mixins: [formItemMixin]
};
</script>
