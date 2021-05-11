<template>
  <div class="page--users">
    <table-view
      title="User List"
      model="user"
      routeName="admin.user"
      :thead="thead"
      :tbody="tbody"
      confirm-message="Are you sure to remove user?"
      :form-config="formConfig"
    ></table-view>
  </div>
</template>

<script>
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

export default {
  name: 'Users',
  setup() {
    return {
      thead,
      tbody,
      formConfig // For test
    };
  }
};
</script>
