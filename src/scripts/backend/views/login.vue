<template>
  <div class="page--login">
    <h2>Admin Login</h2>

    <div v-if="store.user">
      <p>{{ store.user }}</p>
      <ui-button @click="store.logout">Logout</ui-button>
    </div>
    <ui-form v-else>
      <legend>Login Form</legend>

      <ui-alert v-if="alert.message" :state="alert.state">{{
        alert.message
      }}</ui-alert>

      <ui-form-field>
        <ui-textfield
          v-model="formData.account"
          icon="account_box"
          required
          @enter="login"
        >
          Account
        </ui-textfield>
      </ui-form-field>
      <ui-form-field>
        <ui-textfield
          v-model="formData.password"
          inputType="password"
          icon="lock"
          required
          @enter="login"
        >
          Password
        </ui-textfield>
      </ui-form-field>

      <ui-form-field>
        <ui-button raised @click="login">Login</ui-button>
      </ui-form-field>
    </ui-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useBus, useStore, useValidator } from 'balm-ui';

const validations = {
  account: {
    label: 'Account',
    validator: 'required'
  },
  password: {
    label: 'Password',
    validator: 'required'
  }
};

const state = reactive({
  formData: {
    account: '',
    password: ''
  },
  alert: {
    state: 'warning',
    message: ''
  }
});

export default {
  name: 'AdminLogin',
  setup() {
    const bus = useBus();
    const store = useStore();
    const balmUI = useValidator();

    bus.on('on-error', (message) => {
      state.alert = {
        state: 'error',
        message
      };
    });

    return {
      balmUI,
      store,
      ...toRefs(state)
    };
  },
  methods: {
    login() {
      let result = this.balmUI.validate(state.formData);
      let { valid, message } = result;

      state.alert = {
        state: 'warning',
        message
      };

      if (valid) {
        this.store.login(state.formData);
      }
    }
  }
};
</script>
