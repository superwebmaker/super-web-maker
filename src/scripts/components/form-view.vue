<template>
  <ui-form :type="type" :nowrap="nowrap" action-align="center">
    <template #default="{ itemClass, subitemClass, actionClass }">
      <slot name="before"></slot>

      <ui-grid v-if="isSearchForm">
        <ui-grid-cell v-for="configData in formConfig" :key="configData.key">
          <component
            :is="`input-${configData.type}`"
            :config="configData"
            :form-data="formData"
            :item-class="itemClass"
            :subitem-class="subitemClass"
            @change="onChange"
          ></component>
        </ui-grid-cell>
      </ui-grid>
      <template v-else>
        <template v-for="configData in formConfig" :key="configData.key">
          <component
            :is="`input-${configData.type}`"
            :config="configData"
            :form-data="formData"
            :item-class="itemClass"
            :subitem-class="subitemClass"
            @change="onChange"
          ></component>
        </template>
      </template>

      <slot name="after"></slot>

      <ui-form-field :class="[itemClass, actionClass]">
        <slot name="actions"></slot>
      </ui-form-field>
    </template>
  </ui-form>
</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue';
import { types } from 'balm-ui';

export default {
  name: 'FormView',
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      }
    },
    formConfig: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    type: {
      type: String,
      default: 'horizontal'
    },
    nowrap: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const state = reactive({
      formData: {}
    });

    const isSearchForm = computed(() => props.type === 'horizontal');

    watch(
      () => props.modelValue,
      (val) => {
        state.formData = val;
      }
    );

    return {
      ...toRefs(state),
      emit,
      isSearchForm
    };
  },
  methods: {
    onChange(key, value) {
      if (types.isString(key)) {
        this.formData[key] = value;
        this.emit('update:modelValue', this.formData);
      }
    }
  }
};
</script>
