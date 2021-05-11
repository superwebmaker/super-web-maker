<template>
  <ui-input-field
    :config="config"
    :item-class="itemClass"
    :disabled="disabled"
    :readonly="readonly"
  >
    <div>
      <ui-select
        v-model="provinceValue"
        :options="config.provinceOptions"
        default-label="请选择平台所属地区"
        :disabled="disabled || readonly"
        @update:modelValue="onProvinceChange(config, $event)"
      ></ui-select>
      <ui-select
        v-model="value"
        :options="options"
        default-label="请选择媒体平台"
        :disabled="disabled || readonly"
        @update:modelValue="$emit('change', config.key, $event)"
      ></ui-select>
    </div>
  </ui-input-field>
</template>

<script>
import formItemMixin from './form-item';

export default {
  name: 'InputMultiSelect',
  mixins: [formItemMixin],
  data() {
    return {
      provinceValue: this.config.provinceValue,
      NewsMediaOptions: new Map(),
      options: []
    };
  },
  watch: {
    data(val) {
      this.provinceValue = val.provinceValue;
      this.getOptions(this.provinceValue);
    }
  },
  mounted() {
    this.config.options.forEach(({ id, list }) => {
      this.NewsMediaOptions.set(id, list);
    });
    this.getOptions(this.provinceValue);
  },
  methods: {
    getOptions(key) {
      this.options = this.NewsMediaOptions.has(key)
        ? this.NewsMediaOptions.get(key)
        : [];
    },
    onProvinceChange({ provinceKey, provinceValue, key }, curProvinceValue) {
      this.getOptions(curProvinceValue);
      this.$emit('change', provinceKey, curProvinceValue);

      // NOTE: 无省份或切换省份后清空媒体值
      if (!curProvinceValue || +curProvinceValue !== +provinceValue) {
        this.value = '';
        this.$emit('change', key, '');
      }
    }
  }
};
</script>
