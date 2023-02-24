<template>
  <Page title="Category Keyword" class="Category">
    <Table ref="table" :load-data="loadData" table-name="Category">
      <template #actions>
        <div class="flexMode vc p0-16">
          <div class="flexMode vc pr10">
            <el-select
              v-model="state.search.type"
              clearable
              filterable
              :placeholder="$l('Category')"
              size="small"
            >
              <el-option
                v-for="(it, i) in categoryMap"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="w120 pr10">
            <Device v-model="state.search.device" :placeholder="$l('Device')" />
          </div>
          <div class="pr10">
            <Country v-model="state.search.country" type="aso" />
          </div>
          <div class="pr10">
            <el-button plain round @click="toReset">
              <span>{{ $l('Reset') }}</span>
            </el-button>
          </div>
          <div class="pr10">
            <el-button plain round type="primary" @click="toSearch">
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
        :label="$l('Country or Region')"
        prop="country"
        width="240"
        sortable
      />
      <el-table-column :label="$l('Keyword')" prop="keywords" sortable />
      <el-table-column
        :label="$l('Volumn')"
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
    country: 'US',
    device: 'IPHONE',
  },
  osearch: {},
});

// 计算属性

// 监听

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
