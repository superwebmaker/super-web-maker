<template>
  <ui-form>
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

export default {
  name: 'Login',
  setup() {
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
      let result = this.balmUI.validate(this.formData);
      let { valid, message } = result;

      this.alert = {
        state: 'warning',
        message
      };

      if (valid) {
        this.store.login(this.formData);
      }
    }
  }
};
</script>
