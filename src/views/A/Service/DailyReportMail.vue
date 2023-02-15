<template>
  <Page title="Daily Report Mail" class="DailyReportMail">
    <Table ref="table" :load-data="loadData" table-name="DailyReportMail">
      <template #actions>
        <div class="flexMode vc p0-16">
          <el-button circle plain type="primary" @click='toCreate'>
            <template #icon>
              <i class="adicon ad-plus"></i>
            </template>
          </el-button>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="80" align="center" />
      <el-table-column :label="$l('Org')" prop="orgName" width="200" />
      <el-table-column :label="$l('Timezone')" prop="timezone" width="120" />
      <el-table-column :label="$l('Reciplent')" prop="reciplent" width="200" />
      <el-table-column label="CC" prop="cc" width="200" />
      <el-table-column :label="$l('Status')" prop="status" width="100" />
      <el-table-column :label="$l('Send Date')" prop="sendDate" width="120" />
      <el-table-column :label="$l('Send Time')" prop="sendTime" width="120" />
      <el-table-column :label="$l('Last Run')" prop="lastRun" width="120" />
      <el-table-column :label="$l('Service Fee')" prop="serviceFee" width="120" />
      <el-table-column label="-" />
    </Table>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DailyReportMail',
});
// 数据
const state = reactive({
  total: 1000,
});

// 挂载

// 事件
const loadData = async (v) => {
  const { pageSize, pageNum } = v;
  const list = window.$fd(pageSize, (i) => {
    const id = (pageNum - 1) * pageSize + i + 1;
    return {
      id,
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
