<template>
  <Page class="Org">
    <Table ref="table" minus-height="-48" :load-data="loadData">
      <template #actions>
        <span class="pl16">{{ $l('Org') }}</span>
      </template>
      <el-table-column
        :label="$l('Name')"
        prop="name"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column :label="$l('App')" width="240">
        <template #default="{ row }">
          <Avatar :list="row.apps" />
        </template>
      </el-table-column>
      <el-table-column :label="$l('Country or Regions')" width="240">
        <template #default="{ row }">
          <Avatar :list="row.country" type="country" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Account')"
        prop="account"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$l('Currency')"
        prop="currency"
        width="100"
        sortable
      />
      <el-table-column label="-" />
    </Table>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'Org',
});
// 数据
const state = reactive({
  total: 1000,
});
const countryMap = computed(() => {
  return window.$map.country.countryAllMap;
});
// 挂载

// 事件
const loadData = async (v) => {
  const { pageSize, pageNum } = v;
  const countryLen = countryMap.value.length;
  const list = window.$fd(pageSize, (i) => {
    const id = (pageNum - 1) * pageSize + i;
    return {
      id,
      name: 'Name ' + id,
      apps: window.$fd(window.$rn(20), (a) => {
        const appId = id + '-' + a;
        return {
          appId,
          name: 'App ' + appId,
        };
      }),
      country: window.$fd(window.$rn(61), (i) => {
        return countryMap.value[window.$rn(countryLen)];
      }),
      currency: window.$rn(2) ? '$' : '¥',
      account: 'Account ' + id,
    };
  });
  return {
    list,
    total: state.total,
  };
};
// 计算属性

// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
