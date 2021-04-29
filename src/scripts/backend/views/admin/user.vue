<template>
  <div class="page--user-detail">
    <h2>{{ isNew ? 'Create' : 'Edit' }} User</h2>

    <ui-form type="|" class="application-form" action-align="center">
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
          <ui-button class="large" outlined @click="onCancel">取消</ui-button>
          <ui-button class="large" raised @click="onSave">保存</ui-button>
        </ui-form-field>
      </template>
    </ui-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import configForm from '@/backend/config/form-items';
import { useValidator } from 'balm-ui';

const state = reactive({
  formData: {},
  errorMessage: ''
});

export default {
  name: 'User',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const validator = useValidator();

    const isNew = !route.params.id;

    return {
      isNew,
      router,
      validator,
      ...toRefs(state),
      configForm // For Test
    };
  },
  methods: {
    onChange(key, value) {
      state.formData[key] = value;
    },
    onCancel() {
      this.router.back();
    },
    onSave() {
      const { valid, message } = this.validator.validate(this.formData);
      state.errorMessage = message;

      if (valid) {
        // TODO
        console.log('gg');
      }
    }
  }
};
</script>
