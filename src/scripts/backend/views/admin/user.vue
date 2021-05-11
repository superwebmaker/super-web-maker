<template>
  <div class="page--user-detail">
    <detail-view
      title="User"
      model="user"
      :form-config="formConfig"
      :form-data="formData"
      :validations="validations"
    ></detail-view>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import formConfig from '@/backend/config/form-items';

const state = reactive({
  formData: {}
});

const validations = {
  intro: {
    validator: 'required'
  }
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
      formConfig, // For Test
      validations
    };
  }
};
</script>
