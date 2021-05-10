<template>
  <div class="page--user-detail">
    <ui-detail-view
      title="User"
      :config-form="configForm"
      :api="api"
      :data="formData"
      :validations="validations"
    ></ui-detail-view>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import configForm from '@/backend/config/form-items';

const state = reactive({
  formData: {}
});

const validations = {
  intro: {
    validator: 'required'
  }
};

const api = {
  create: 'createUser',
  update: 'updateUser'
};

export default {
  name: 'User',
  setup() {
    const route = useRoute();

    if (route.params.id) {
      onBeforeMount(() => {
        setTimeout(() => {
          state.formData = {
            link: 'Hello BalmUI',
            intro: '老杨传说的效率低'
          };
        }, 3000);
      });
    }

    return {
      ...toRefs(state),
      api,
      configForm, // For Test
      validations
    };
  }
};
</script>
