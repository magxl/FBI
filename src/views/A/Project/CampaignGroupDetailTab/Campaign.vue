<template>
  <div class="TabCampaign">
    <Chart :search="prop.search" />
    <VsTable
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="CampaignGroupDetailTabCampaign"
      border-top
      class="border-t"
      filter-width="400"
      :filter="state.filter"
    >
      <template #actions>
        <Tool />
      </template>
      <template #filter>
        <Filter :filter="state.filter" :orginfo="prop.orginfo" @filter="toSearch" />
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column label="ID" prop="campaignId" width="100">
        <template #default="{ row }">
          <span
            class="txt-primary hover-underline"
            @click="toChangeTab(row, 'AdGroup')"
            >{{ row.campaignId }}</span
          >
        </template>
      </el-table-column>
      <el-table-column :label="$l('Campaign')" prop="campaignName" width="200">
        <template #default="{ row }">
          <Name v-model="row.campaignName" :row="row" />
        </template>
      </el-table-column>
      <el-table-column label="-"></el-table-column>
      <el-table-column :label="$l('Operation')" width="100" fixed="right">
        <template #default="{ row }">
          <div class="mgbtn circle24" @click="toEdit(row)">
            <i class="adicon ad-edit"></i>
          </div>
        </template>
      </el-table-column>
    </VsTable>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </div>
</template>
<script setup>
import Chart from './Campaign/Chart.vue';
import Tool from './Campaign/Tool.vue';
import Filter from './Campaign/Filter.vue';
import Name from './Campaign/Name.vue';
import Edit from './Campaign/Edit.vue';
// 定义
defineOptions({
  name: 'TabCampaign',
  components: { Chart, Tool, Filter, Name },
});
// 传参
const prop = defineProps({
  search: {
    type: Object,
    default: () => {},
  },
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  loading: true,
  options: {},
  list: [],
  filter: {},
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 500,
      cpt: Edit,
    },
  ],
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载
onActivated(() => {
  init();
});
// 事件
const emit = defineEmits();
const init = () => {
  if (state.loading) {
    console.info('Campaign Init');
    getData();
  }
};
const getData = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(200000, (i) => {
      const id = window.$rn(88888888, 11111111);
      return {
        id: i + 1,
        campaignId: id,
        campaignName: 'Campaign ' + id,
      };
    });
    state.loading = false;
  });
};
const toSearch = async (v) => {
  state.filter = v;
  proxy.$refs.table.toCloseFilter();
  await getData();
  proxy.$refs.table.refreshTable();
};
const toEdit = (row) => {
  state.drawer[0].title = window.$l('Update Campaign Info');
  state.drawer[0].params = { row };
  state.currentDrawer = 0;
};
const toChangeTab = (row, v) => {
  localStorage.setItem('campaignId', row.campaignId);
  emit('set-tab', v);
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
