<template>
  <div>
    <h2>Admin Login</h2>
    <p>User: {{ $store.isAuthenticated }}</p>
    <p v-if="$store.user">
      <ui-button @click="$store.logout">Logout</ui-button>
    </p>
    <fieldset v-else>
      <ui-form-field block>
        <ui-textfield v-model="formData.username">
          Username
        </ui-textfield>
      </ui-form-field>
      <ui-form-field block>
        <ui-textfield inputType="password" v-model="formData.password">
          Password
        </ui-textfield>
      </ui-form-field>
      <ui-form-field block>
        <ui-button @click="$store.login(formData)">Login</ui-button>
      </ui-form-field>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'adminLogin',
  data() {
    return {
      formData: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      // NOTE: 检查权限
      await vm.$store.me();
      if (vm.$store.isAuthenticated) {
        next('/');
      }
    });
  }
};
</script>
