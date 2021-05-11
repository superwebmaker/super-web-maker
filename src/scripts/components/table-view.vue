<template>
  <div class="yb-table-view">
    <h2 class="title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <form-view
      v-if="formConfig.length"
      v-model="formData"
      :form-config="formConfig"
      nowrap
      class="yb-table-view__conditions"
    >
      <template #actions>
        <ui-button raised @click="onSearch">Search</ui-button>
      </template>
    </form-view>

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
import { toCapitalize } from '@/utils';

const state = reactive({
  formData: {},
  selectedRows: [],
  tdata: [],
  total: 0,
  page: 1
});

export default {
  name: 'TableView',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    model: {
      type: String,
      default: '',
      required: true
    },
    routeName: {
      type: String,
      default: '',
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
    formConfig: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const storeApiFn = `get${toCapitalize(props.model)}List`;

    async function getData(page = state.page) {
      const postData = Object.assign({}, state.formData, {
        page
      });
      const { rows, count } = await store[storeApiFn](postData);

      state.tdata = rows;
      state.total = count;
    }

    onBeforeMount(async () => {
      await getData();
    });

    return {
      ...toRefs(state),
      storeApiFn,
      router,
      getData
    };
  },
  methods: {
    removeRowData({ id }) {
      this.$confirm(this.confirmMessage).then((result) => {
        if (result) {
          this.$store[`remove${toCapitalize(props.model)}`](id);
        }
      });
    },
    onSearch() {
      state.page = 1;
      this.$store[this.storeApiFn](state.formData);
    }
  }
};
</script>
  