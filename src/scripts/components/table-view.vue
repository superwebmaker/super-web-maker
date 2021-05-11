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
        <template
          v-for="(action, actionIndex) in actionConfig"
          :key="actionIndex"
        >
          <ui-icon v-if="action.type === 'icon'" @click="action.onClick(data)">
            {{ action.icon }}
          </ui-icon>
          <ui-button
            v-else-if="action.type === 'button'"
            @click="action.onClick(data)"
          >
            {{ action.text }}
          </ui-button>
          <router-link v-else :to="action.url(data)">
            <ui-icon v-if="action.icon">{{ action.icon }}</ui-icon>
            <span v-if="action.text">{{ action.text }}</span>
          </router-link>
        </template>
      </template>

      <ui-pagination
        v-model="page"
        :total="total"
        show-total
        show-jumper
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
    formConfig: {
      type: Array,
      default() {
        return [];
      }
    },
    actionConfig: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const state = reactive({
      formData: {},
      selectedRows: [],
      tdata: [],
      total: 0,
      page: 1
    });

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
    onSearch() {
      this.page = 1;
      this.$store[this.storeApiFn](this.formData);
    }
  }
};
</script>
