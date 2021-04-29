<template>
  <div class="page--users">
    <h2>Users</h2>

    <div class="table-view-conditions"></div>

    <div class="table-view-topbar">
      <ui-button icon="add" raised>Add</ui-button>
    </div>

    <ui-table
      v-model="selectedRows"
      class="table-view-content"
      fullwidth
      :data="users"
      :thead="thead"
      :tbody="tbody"
      row-checkbox
      selected-key="id"
    >
      <template #actions="{ data }">
        <router-link :to="{ name: 'admin.user', params: { id: data.id } }">
          <ui-icon>description</ui-icon>
        </router-link>
        <router-link :to="{ name: 'admin.user.edit', params: { id: data.id } }">
          <ui-icon>edit</ui-icon>
        </router-link>
        <ui-icon @click="removeUser(data)">delete</ui-icon>
      </template>

      <ui-pagination
        v-model="page"
        :total="total"
        show-total
        @change="onPage"
      ></ui-pagination>
    </ui-table>
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useStore } from 'balm-ui';

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

const state = reactive({
  selectedRows: [],
  users: [],
  total: 0,
  page: 1
});

export default {
  name: 'Users',
  setup() {
    const store = useStore();

    onBeforeMount(async () => {
      let data = await store.getUsers();
      state.users = data.rows;
      state.total = data.count;
    });

    return {
      ...toRefs(state),
      thead,
      tbody
    };
  },
  methods: {
    removeUser({ id }) {
      this.$confirm('Are you sure to remove user?').then((result) => {
        if (result) {
          console.log('gg');
        }
      });
    },
    onPage(page) {
      state.page = page;
    }
  }
};
</script>
