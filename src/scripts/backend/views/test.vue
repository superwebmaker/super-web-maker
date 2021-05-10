<template>
  <div>Admin Test</div>
  <ui-editor v-model="content" :extension="extension"></ui-editor>
</template>

<script>
const extension = [];

export default {
  data() {
    return {
      content: ''
    };
  }
};
</script>
