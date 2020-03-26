<template>
  <div>
    <h2>Admin Login</h2>

    <ui-form-field>
      <ui-textfield v-model="formData.username">
        Username
      </ui-textfield>
    </ui-form-field>
    <ui-form-field>
      <ui-textfield inputType="password" v-model="formData.password">
        Password
      </ui-textfield>
    </ui-form-field>
    <ui-form-field>
      <ui-button>Login</ui-button>
    </ui-form-field>
  </div>
</template>

<script>
export default {
  name: 'adminLogin',
  data() {
    return {
      formData: {}
    };
  }
};
</script>
