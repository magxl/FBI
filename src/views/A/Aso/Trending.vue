<template>
  <Page title="Trending Keywords" class="Trending">
    <Table ref="table" :load-data="loadData" table-name="Trending">
      <template #actions>
        <div class="flexMode vc p0-16">
          <div class="w120 pr10">
            <Device v-model="state.search.device" :placeholder="$l('Device')" />
          </div>
          <div class="pr10">
            <Country v-model="state.search.country" type="aso" />
          </div>
          <div class="pr10">
            <el-button plain @click="toReset">
              <span>{{ $l('Reset') }}</span>
            </el-button>
          </div>
          <div class="pr10">
            <el-button plain type="primary" @click="toSearch">
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
              <span>{{ $l('Search') }}</span>
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
      <el-table-column
        :label="$l('Volume')"
        prop="volume"
        width="120"
        sortable
      />
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
  search: {
    device: 'IPHONE',
    country: 'US',
  },
  osearch: {},
});

// 挂载
onMounted(() => {
  state.osearch = JSON.parse(JSON.stringify(state.search));
});
// 事件
const toReset = () => {
  state.search = JSON.parse(JSON.stringify(state.osearch));
};
const toSearch = () => {
  proxy.$refs.table.initTable(state.search);
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
