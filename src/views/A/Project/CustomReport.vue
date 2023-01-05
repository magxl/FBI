<template>
  <Page class="CustomReport">
    <Table ref="table" :load-data="loadData" border-t table-name="CustomReport">
      <el-table-column type="select" width="56" />
    </Table>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'CustomReport',
});
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件
const loadData = async () => {
  const { code, data } = await window.$get({
    url: window.$api.project.reportsList,
  });
  if (code === 200) {
    console.info(data);
  }
};
// 卸载
</script>
<style lang="scss" scoped></style>
