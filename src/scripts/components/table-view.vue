<template>
  <div class="yb-table-view">
    <h2 v-if="title">{{ title }}</h2>

    <ui-form
      v-if="searchFormConfig.length"
      class="yb-table-view__conditions"
      nowrap
      action-align="center"
    >
      <template #default="{ itemClass, subitemClass, actionClass }">
        <ui-grid>
          <ui-grid-cell
            v-for="configData in searchFormConfig"
            :key="configData.key"
          >
            <component
              :is="`input-${configData.type}`"
              :config="configData"
              :form-data="formData"
              :item-class="itemClass"
              :subitem-class="subitemClass"
              @change="onChange"
            ></component>
          </ui-grid-cell>
        </ui-grid>

        <ui-form-field :class="[itemClass, actionClass]">
          <ui-button raised @click="onSearch">Search</ui-button>
        </ui-form-field>
      </template>
    </ui-form>

    <section class="table-view-topbar">
      <ui-button icon="add" raised @click="router.push({ name: routeName })">
        新建
      </ui-button>
    </section>

    <ui-table
      v-if="tdata.length"
      v-model="selectedRows"
      class="yb-table-view__table"
      :data="tdata"
      :thead="thead"
      :tbody="tbody"
      fullwidth
      row-checkbox
      selected-key="id"
    >
      <template #actions="{ data }">
        <router-link :to="{ name: routeName, params: { id: data.id } }">
          <ui-icon>edit</ui-icon>
        </router-link>
        <ui-icon @click="removeRowData(data)">delete</ui-icon>
      </template>

      <ui-pagination
        v-model="page"
        :total="total"
        show-total
        @change="getData"
      ></ui-pagination>
    </ui-table>
    <p v-else class="no-data">No Data</p>
  </div>
</template>
  
<script>
import { reactive, toRefs, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'balm-ui';

const state = reactive({
  formData: {},
  selectedRows: [],
  tdata: [],
  total: 0,
  page: 1
});

export default {
  name: 'UiTableView',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    routeName: {
      type: String,
      default: '',
      required: true
    },
    api: {
      type: Object,
      default() {
        return {
          read: '',
          delete: '',
          search: ''
        };
      },
      required: true
    },
    thead: {
      type: Array,
      default() {
        return [];
      }
    },
    tbody: {
      type: Array,
      default() {
        return [];
      }
    },
    confirmMessage: {
      type: String,
      default: 'Are you sure to remove this data?'
    },
    searchFormConfig: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    async function getData(page = state.page) {
      const postData = Object.assign({}, state.formData, {
        page
      });
      const { rows, count } = await store[props.api.read](postData);

      state.tdata = rows;
      state.total = count;
    }

    onBeforeMount(async () => {
      await getData();
    });

    return {
      ...toRefs(state),
      router,
      getData
    };
  },
  methods: {
    removeRowData({ id }) {
      this.$confirm(this.confirmMessage).then((result) => {
        if (result) {
          this.$store[this.api.delete](id);
        }
      });
    },
    onChange(key, value) {
      state.formData[key] = value;
    },
    onSearch() {
      state.page = 1;
      this.$store[this.api.search](state.formData);
    }
  }
};
</script>
  