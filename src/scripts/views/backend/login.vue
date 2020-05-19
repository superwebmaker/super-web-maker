<template>
  <div class="page--login">
    <h2>Admin Login</h2>
    <p v-if="$store.user">
      <ui-button @click="$store.logout">Logout</ui-button>
    </p>
    <fieldset v-else>
      <legend>Admin Login</legend>
      <ui-alert v-if="alert.message" :state="alert.state">{{
        alert.message
      }}</ui-alert>
      <ui-form-field block>
        <ui-textfield v-model="formData.username" icon="account_box" required>
          Username
        </ui-textfield>
      </ui-form-field>
      <ui-form-field block>
        <ui-textfield
          v-model="formData.password"
          inputType="password"
          icon="lock"
          required
        >
          Password
        </ui-textfield>
      </ui-form-field>
      <ui-form-field block>
        <ui-button raised @click="login">Login</ui-button>
      </ui-form-field>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'adminLogin',
  validations: {
    username: {
      label: 'Username',
      validator: 'required'
    },
    password: {
      label: 'Password',
      validator: 'required'
    }
  },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      alert: {
        state: 'warning',
        message: ''
      }
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
  },
  created() {
    this.$bus.$on('on-error', (message) => {
      this.alert = {
        state: 'error',
        message
      };
    });
  },
  methods: {
    login() {
      let result = this.$validate(this.formData);
      let { valid, message } = result;

      this.alert = {
        state: 'warning',
        message
      };

      if (valid) {
        this.$store.login(this.formData);
      }
    }
  }
};
</script>
