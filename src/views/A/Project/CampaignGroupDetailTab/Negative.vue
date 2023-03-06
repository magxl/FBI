<template>
  <div class="TabNegative">
    <VsTable
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="CampaignGroupDetailTabNegative"
      border-top
      class="border-t"
      filter-width="400"
      :filter="filter"
      minus-height="60"
      @selection-change="selectionChange"
    >
      <template #actions>
        <Tool :selection="state.selection" :orginfo="prop.orginfo" />
      </template>
      <template #filter>
        <Filter :orginfo="prop.orginfo" @filter="toSearch" />
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column
        label="ID"
        prop="negativeId"
        width="100"
      ></el-table-column>
      <el-table-column
        :label="$l('Negative')"
        prop="negative"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="-"></el-table-column>
    </VsTable>
  </div>
</template>
<script setup>
import Tool from './Negative/Tool.vue';
import Filter from './Negative/Filter.vue';
// 定义
defineOptions({
  name: 'TabNegative',
  components: { Tool, Filter },
});
// 传参
const prop = defineProps({
  search: {
    type: Object,
    default: Object.create(null),
  },
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  loading: true,
  filter: {},
  selection: [],
});
const { proxy } = getCurrentInstance();
// 挂载
onActivated(() => {
  init();
});
// 事件
const init = () => {
  console.info('Negative Init');
  getData();
};
const getData = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(2000, (i) => {
      const id = window.$rn(88888888, 11111111);
      return {
        id: i + 1,
        negative: 'Negative ' + id,
        negativeId: id,
      };
    });
    state.loading = false;
  });
};
const toSearch = (v) => {
  state.filter = v;
};
const selectionChange = (v) => {
  state.selection = v;
};
const toClearFilter = () => {
  state.filter = {};
};
// 计算属性
const filter = computed(() => {
  const filter = { ...state.filter };
  if (state.mode) {
    filter[state.mode] = state.txt;
  }
  return filter;
});
// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
