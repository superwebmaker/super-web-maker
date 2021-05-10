<template>
  <div class="yb-detail-view">
    <h2 v-if="title">{{ isNew ? 'Create' : 'Edit' }} {{ title }}</h2>

    <ui-form
      v-if="configForm.length"
      type="|"
      class="yb-detail-view__form"
      action-align="center"
    >
      <template #default="{ itemClass, subitemClass, actionClass }">
        <template v-for="configData in configForm" :key="configData.key">
          <component
            :is="`input-${configData.type}`"
            :config="configData"
            :form-data="formData"
            :item-class="itemClass"
            :subitem-class="subitemClass"
            @change="onChange"
          ></component>
        </template>

        <ui-alert v-if="errorMessage" state="warning">{{
          errorMessage
        }}</ui-alert>

        <ui-form-field :class="[itemClass, actionClass]">
          <ui-button outlined @click="onCancel">Cancel</ui-button>
          <ui-button raised @click="onSave">Save</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
    <ui-spinner v-else active></ui-spinner>
  </div>
</template>
  
<script>
import {
  ref,
  reactive,
  toRefs,
  watch,
  onBeforeMount,
  onBeforeUnmount
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useValidator } from 'balm-ui';

const state = reactive({
  formData: {},
  useValidator: false,
  errorMessage: ''
});

export default {
  name: 'UiDetailView',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    configForm: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    api: {
      type: Object,
      default() {
        return {
          create: '',
          update: ''
        };
      },
      required: true
    },
    data: {
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
    const route = useRoute();
    const router = useRouter();
    const validator = useValidator();

    const isNew = !route.params.id;

    watch(
      () => props.data,
      (val) => {
        state.formData = val;
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
      isNew,
      router,
      validator,
      ...toRefs(state)
    };
  },
  methods: {
    onChange(key, value) {
      state.formData[key] = value;
    },
    onCancel() {
      this.router.back();
    },
    async onRequest() {
      await this.$store[this.isNew ? this.api.create : this.api.update](
        Object.assign({}, state.formData)
      );
    },
    onSave() {
      if (state.useValidator) {
        const { valid, message } = this.validator.validate(state.formData);
        state.errorMessage = message;

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
  