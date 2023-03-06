<template>
  <div class="TabAdGroup">
    <Chart ref="chart" :search="prop.search" :selection="state.selection" />
    <VsTable
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="CampaignGroupDetailTabAdGroup"
      border-top
      class="border-t"
      filter-width="400"
      :filter="state.filter"
      @selection-change="selectionChange"
    >
      <template #actions>
        <Tool />
      </template>
      <template #filter>
        <Filter :campaign-id="state.filter.campaignId" :orginfo="prop.orginfo" @filter="toSearch" />
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column label="ID" prop="adgroupId" width="100">
        <template #default="{ row }">
          <span
            class="txt-primary hover-underline"
            @click="toChangeTab(row, 'Keyword')"
            >{{ row.adgroupId }}</span
          >
        </template>
      </el-table-column>
      <el-table-column :label="$l('Ad Group')" prop="adgroupName" width="200">
        <template #default="{ row }">
          <Name v-model="row.adgroupName" :row="row" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Campaign')"
        prop="campaignName"
        width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        :label="$l('Campaign ID')"
        prop="campaignId"
        width="100"
      >
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
  </div>
</template>
<script setup>
import Chart from './Campaign/Chart.vue';
import Tool from './AdGroup/Tool.vue';
import Filter from './AdGroup/Filter.vue';
import Name from './AdGroup/Name.vue';
import Edit from './AdGroup/Edit.vue';
// 定义
defineOptions({
  name: 'TabAdGroup',
  components: { Chart, Tool, Filter, Edit, Name },
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
  selection: [],
});
const { proxy } = getCurrentInstance();

// 挂载
// onMounted(() => {
//   init();
// });
onActivated(() => {
  init();
});
// 事件
const emit = defineEmits();

const init = () => {
  const campaignId = Number(localStorage.getItem('campaignId'));
  if (state.loading) {
    console.info('Ad Group Init');
    // 新进入
    if (campaignId) {
      state.filter.campaignId = campaignId;
      localStorage.removeItem('campaignId');
    }
    getData();
  } else {
    // 已缓存
    if (campaignId && campaignId !== state.filter.campaignId) {
      state.filter.campaignId = campaignId;
      localStorage.removeItem('campaignId');
      getData();
    }
  }
};
const getData = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(2000, (i) => {
      const id = window.$rn(88888888, 11111111);
      const cid = window.$rn(88888888, 11111111);
      return {
        id: i + 1,
        campaignId: cid,
        campaignName: 'Campaign ' + cid,
        adgroupId: id,
        adgroupName: 'Ad Group ' + id,
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
  state.drawer[0].title = window.$l('Update Ad Group Info');
  state.drawer[0].params = { row };
  state.currentDrawer = 0;
};
const selectionChange = (v) => {
  console.info(v);
  state.selection = v;
};
const toChangeTab = (row, v) => {
  console.info(row);
  localStorage.setItem('campaignId', row.campaignId);
  localStorage.setItem('adgroupId', row.adgroupId);
  emit('set-tab', v);
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
