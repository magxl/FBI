<template>
  <div class="TabKeyword">
    <VsTable
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="CampaignGroupDetailTabAdGroup"
      border-top
      class="border-t"
      filter-width="400"
      :filter="state.filter"
      minus-height="60"
      @selection-change="selectionChange"
    >
      <template #actions>
        <Tool :orginfo="prop.orginfo" />
      </template>
      <template #filter>
        <Filter
          :campaign-id="state.filter.campaignId"
          :adgroup-id="state.filter.adgroupId"
          :orginfo="prop.orginfo"
          @filter="toSearch"
        />
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column label="ID" prop="keywordId" width="100">
        <template #default="{ row }">
          <span
            class="txt-primary hover-underline"
            @click="toChangeTab(row, 'keywordId')"
            >{{ row.keywordId }}</span
          >
        </template>
      </el-table-column>
      <el-table-column :label="$l('Keyword')" prop="keyword" width="200">
        <template #default="{ row }">
          <span
            class="txt-primary hover-underline"
            @click="toChangeTab(row, 'keyword')"
            >{{ row.keyword }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Campaign')"
        prop="campaignName"
        width="200"
        show-overflow-tooltip
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
import Tool from './Keyword/Tool.vue';
import Filter from './Keyword/Filter.vue';
import Edit from './Keyword/Edit.vue';
// 定义
defineOptions({
  name: 'TabKeyword',
  components: { Tool, Filter, Edit },
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
      cpt: markRaw(Edit),
    },
  ],
  selection: [],
});
const { proxy } = getCurrentInstance();

// 挂载

onActivated(() => {
  init();
});
// 事件
const emit = defineEmits();
const init = () => {
  // 传参，同时有同时无
  const adgroupId = Number(localStorage.getItem('adgroupId'));
  const campaignId = Number(localStorage.getItem('campaignId'));
  let filter = {};
  if (state.loading) {
    console.info('Keyword Init');
    // 新进入
    if (campaignId) {
      // 有传参
      filter.campaignId = campaignId;
      localStorage.removeItem('campaignId');
      filter.adgroupId = adgroupId;
      localStorage.removeItem('adgroupId');
      state.filter = {
        ...state.filter,
        ...filter,
      };
    }
    getData();
  } else {
    // 已缓存
    if (campaignId && campaignId !== state.filter.campaignId) {
      filter.campaignId = campaignId;
      localStorage.removeItem('campaignId');
      filter.adgroupId = adgroupId;
      localStorage.removeItem('adgroupId');
      state.filter = {
        ...state.filter,
        ...filter,
      };
      getData();
    }
    // else if (adgroupId && adgroupId !== state.filter.adgroupId) {
    //   state.filter.adgroupId = adgroupId;
    //   localStorage.removeItem('adgroupId');
    //   getData();
    // }
  }
};
const getData = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(2000, (i) => {
      const id = window.$rn(88888888, 11111111);
      return {
        id: i + 1,
        keyword: 'Keyword ' + id,
        keywordId: id,
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
  state.drawer[0].title = window.$l('Update Keyword Info');
  state.drawer[0].params = { row };
  state.currentDrawer = 0;
};
const selectionChange = (v) => {
  console.info(v);
  state.selection = v;
};
const toChangeTab = (row, type) => {
  localStorage.setItem(type, row[type]);
  emit('set-tab', 'SearchTerm');
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
