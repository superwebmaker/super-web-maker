<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <ui-chips v-if="disabled">
      <ui-chip v-for="(option, index) in config.options" :key="index">
        {{ option.label }}
      </ui-chip>
    </ui-chips>
    <ui-chips v-else-if="readonly">
      <ui-chip v-for="(option, index) in selectedOptions" :key="index">
        {{ option.label }}
      </ui-chip>
    </ui-chips>
    <ui-chips
      v-else
      v-model="value"
      type="filter"
      :options="config.options"
      @update:modelValue="$emit('change', config.key, $event)"
    ></ui-chips>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputChips',
  mixins: [formItemMixin],
  computed: {
    selectedOptions() {
      return this.config.options.filter((option) =>
        this.value.includes(option.value)
      );
    }
  }
};
</script>
