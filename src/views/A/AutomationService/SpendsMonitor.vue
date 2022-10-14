<template>
  <Page class="SpendsMonitor">
    <Table ref="table" :load-data="loadData">
      <el-table-column type="selection" width="56" align="center" />
      <el-table-column label="id" prop="id" width="80" />
      <el-table-column label="name" prop="name" width="120" />
      <el-table-column label="-" />
    </Table>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'SpendsMonitor',
});
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件
const loadData = (v) => {
  let total = 20;
  const list = window.$fakeData(total, (i) => {
    return {
      id: i,
      name: 'name' + i,
    };
  });
  return {
    list,
    total,
  };
};
// 卸载
</script>
<style lang="scss" scoped></style>
