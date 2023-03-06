<template>
  <div class="TabSearchTerm">
    <VsTable
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="CampaignGroupDetailTabSearchTerm"
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
        <Filter
          :key="state.txt"
          :txt="state.txt"
          :mode="state.mode"
          :orginfo="prop.orginfo"
          @filter="toSearch"
        />
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
      ></el-table-column>
      <el-table-column
        label="ID"
        prop="searchTermId"
        width="100"
      ></el-table-column>
      <el-table-column
        :label="$l('Search Term')"
        prop="searchTerm"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="$l('Keyword ID')"
        prop="keywordId"
        width="100"
      ></el-table-column>
      <el-table-column
        :label="$l('Keyword')"
        prop="keyword"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="-"></el-table-column>
    </VsTable>
    <!-- <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" /> -->
  </div>
</template>
<script setup>
import Tool from './SearchTerm/Tool.vue';
import Filter from './SearchTerm/Filter.vue';
import { onActivated } from 'vue';
// 定义
defineOptions({
  name: 'TabSearchTerm',
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
  txt: '',
  mode: 0,
  selection: [],
});
const {proxy} = getCurrentInstance();
// 挂载
onActivated(() => {
  init();
});
// 事件
const init = () => {
  const keywordId = Number(localStorage.getItem('keywordId'));
  const keyword = localStorage.getItem('keyword');
  console.info(keywordId, keyword);
  if (state.loading) {
    console.info('Keyword Init');
    // 新进入
    if (keyword) {
      state.txt = keyword;
      state.mode = 'keyword';
      localStorage.removeItem('keyword');
    }
    if (keywordId) {
      state.txt = keywordId;
      state.mode = 'keywordId';
      localStorage.removeItem('keywordId');
    }
    getData();
  } else {
    // 已缓存
    if (keyword) {
      state.mode = 'keyword';
      state.txt = keyword;
      toClearFilter();
      localStorage.removeItem('keyword');
      getData();
    }
    if (keywordId) {
      toClearFilter();
      state.mode = 'keywordId';
      state.txt = keywordId;
      localStorage.removeItem('keywordId');
      getData();
    }
  }
};
const getData = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(2000, (i) => {
      const id = window.$rn(88888888, 11111111);
      const kid = window.$rn(88888888, 11111111);
      return {
        id: i + 1,
        searchTerm: 'SearchTerm ' + id,
        searchTermId: id,
        keyword: 'Keyword ' + kid,
        keywordId: kid,
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
