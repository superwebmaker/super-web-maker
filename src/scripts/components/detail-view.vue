<template>
  <div class="yb-detail-view">
    <h2 class="title">
      {{ isNew ? 'Create' : 'Edit' }} <slot name="title">{{ title }}</slot>
    </h2>

    <form-view
      v-if="formConfig.length"
      v-model="detailFormData"
      :form-config="formConfig"
      type="|"
      class="yb-detail-view__form"
    >
      <template #after>
        <ui-alert v-if="errorMessage" state="warning">{{
          errorMessage
        }}</ui-alert>
      </template>
      <template #actions>
        <ui-button outlined @click="onCancel">Cancel</ui-button>
        <ui-button raised @click="onSave">Save</ui-button>
      </template>
    </form-view>
    <ui-spinner v-else active></ui-spinner>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  watch,
  onBeforeMount,
  onBeforeUnmount
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useValidator } from 'balm-ui';
import { toCapitalize } from '@/utils';

export default {
  name: 'DetailView',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    model: {
      type: String,
      default: '',
      required: true
    },
    formConfig: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    formData: {
      type: Object,
      default() {
        return {};
      }
    },
    validations: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  setup(props) {
    const state = reactive({
      detailFormData: {},
      useValidator: false,
      errorMessage: ''
    });

    const route = useRoute();
    const router = useRouter();
    const validator = useValidator();

    const isNew = !route.params.id;

    const storeApiFn = computed(() =>
      isNew
        ? `create${toCapitalize(props.model)}`
        : `update${toCapitalize(props.model)}`
    );

    watch(
      () => props.formData,
      (val) => {
        state.detailFormData = val;
      }
    );

    onBeforeMount(() => {
      if (Object.keys(props.validations).length) {
        validator.set(props.validations);
        state.useValidator = true;
      }
    });

    onBeforeUnmount(() => {
      validator.clear();
    });

    return {
      ...toRefs(state),
      router,
      validator,
      isNew,
      storeApiFn
    };
  },
  methods: {
    onCancel() {
      this.router.back();
    },
    async onRequest() {
      await this.$store[this.storeApiFn](
        Object.assign({}, this.detailFormData)
      );
    },
    onSave() {
      if (this.useValidator) {
        const { valid, message } = this.validator.validate(this.detailFormData);
        this.errorMessage = message;

        if (valid) {
          this.onRequest();
        }
      } else {
        this.onRequest();
      }
    }
  }
};
</script>
