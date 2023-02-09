<template>
  <Page title="Trending Keywords" class="Trending">
    <Table ref="table" :load-data="loadData" table-name="Trending">
      <template #actions>
        <div class="flexMode vc p0-16">
          <div class="w120 pr10">
            <Device
              v-model="state.search.device"
              size="small"
              :placeholder="$l('Device')"
            />
          </div>
          <div class="pr10">
            <el-select
              v-model="state.search.regions"
              size="small"
              clearable
              filterable
              :placeholder="$l('Country or Regions')"
            >
              <el-option
                v-for="(it, i) in countryLangMap"
                :key="i"
                :label="it.label_en"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="pr10">
            <el-button plain round size="small" @click="toReset">
              <span>{{$l('Reset')}}</span>
            </el-button>
          </div>
          <div class="pr10">
            <el-button
              plain
              round
              type="primary"
              size="small"
              @click="toSearch"
            >
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
              <span>{{$l('Search')}}</span>
            </el-button>
          </div>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="80" align="center" />
      <el-table-column
        :label="$l('Country or Regions')"
        prop="country"
        width="240"
        sortable
      />
      <el-table-column :label="$l('Keyword')" prop="keywords" sortable />
      <el-table-column :label="$l('Volume')" prop="volume" width="120" sortable />
    </Table>
  </Page>
</template>
<script setup>
import { getCurrentInstance } from '@vue/runtime-core';

defineOptions({
  name: 'Ranking',
});
// 数据
const { proxy } = getCurrentInstance();
const state = reactive({
  table: {
    total: 1000,
  },
  search: {},
  appidMax: 5,
  appidCount: 0,
});

// 计算属性
const appidClass = computed(() => {
  return state.appidCount === state.appidMax ? 'txt-red' : 'txt-primary';
});
const countryLangMap = computed(() => {
  return window.$map.country.countryLang;
});
// 监听

// 挂载

// 事件
const toReset = () => {
  console.info(proxy);
  console.info(proxy.state);
  console.info(proxy.$data);
  console.info(proxy.$options);
};
const toSearch = () => {
  proxy.$refs.table.initTable(state.search);
};
const appidInput = (v) => {
  if (v) {
    let arr = v.split(',');
    if (arr.length > state.appidMax) {
      arr = arr.slice(0, state.appidMax);
      state.search.app_id = arr.join(',');
    }
    state.appidCount = arr.length;
  } else {
    state.appidCount = 0;
  }
};
const loadData = (v) => {
  const list = window.$fakeData(v.pageSize, (i) => {
    const id = (v.pageNum - 1) * v.pageSize + i;
    return {
      id,
      name: 'name' + id,
      app_id: window.$randomNumber(88888888, 11111111),
      ranking: window.$randomNumber(88888888, 1),
      status: window.$randomNumber(2),
    };
  });
  return {
    list,
    total: state.table.total,
  };
};
// 卸载
</script>
<style lang="scss" scoped></style>
