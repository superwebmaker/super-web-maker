<template>
  <div class="page--users">
    <table-view
      title="User List"
      model="user"
      routeName="admin.user"
      :thead="thead"
      :tbody="tbody"
      :form-config="formConfig"
      :action-config="actionConfig"
    ></table-view>
  </div>
</template>

<script>
import { useStore } from 'balm-ui';
import { useConfirm } from 'balm-ui-plus';
import formConfig from '@/backend/config/form-items';

const thead = [
  {
    value: 'ID',
    sort: 'desc',
    columnId: 'id'
  },
  'Username',
  'Role',
  'Created',
  'Updated',
  'Actions'
];

const tbody = [
  'id',
  'name',
  'role_id',
  'created_at',
  'updated_at',
  {
    slot: 'actions'
  }
];

const actionConfig = [
  {
    type: 'link',
    icon: 'edit',
    url(data) {
      return { name: 'admin.user', params: { id: data.id } };
    }
  },
  {
    type: 'button',
    text: 'Button Text',
    onClick(data) {
      console.log(data);
    }
  },
  {
    type: 'icon',
    icon: 'edit',
    onClick({ id }) {
      const $confirm = useConfirm();
      const store = useStore();

      $confirm('Are you sure to remove user?').then((result) => {
        if (result) {
          store.removeUser(id);
        }
      });
    }
  }
];

export default {
  name: 'Users',
  setup() {
    return {
      thead,
      tbody,
      formConfig, // For test
      actionConfig
    };
  }
};
</script>
