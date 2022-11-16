<template>
  <Page class="SpendsMonitor">
    <Table
      ref="table"
      :load-data="loadData"
      border-top
      table-name="SpendsMonitor"
    >
      <template #actions>
        <div class="p0-20">
          <el-button size="mini" @click="toAdd" type="primary" round>
            <template #icon>
              <i class="adicon ad-plus"></i>
            </template>
            <span>{{$l('创建')}}</span>
          </el-button>
        </div>
      </template>
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

const toAdd = () => {};
// 卸载
</script>
<style lang="scss" scoped></style>
