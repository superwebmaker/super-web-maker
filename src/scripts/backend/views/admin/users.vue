<template>
  <div class="page--users">
    <ui-table-view
      title="User List"
      routeName="admin.user"
      :api="api"
      :thead="thead"
      :tbody="tbody"
      confirm-message="Are you sure to remove user?"
      :search-form-config="formConfig"
    ></ui-table-view>
  </div>
</template>

<script>
import formConfig from '@/backend/config/form-items';

const api = {
  read: 'getUsers',
  delete: 'removeUser',
  search: 'getUsers'
};

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

export default {
  name: 'Users',
  setup() {
    return {
      api,
      thead,
      tbody,
      formConfig // For test
    };
  }
};
</script>
