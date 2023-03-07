<template>
  <Page title="MMP Setting" class="MMPSetting">
    <Table ref="table" :load-data="loadData" table-name="MMPSetting">
      <template #actions>
        <div class="flexMode vc p0-16">
          <el-button plain circle type="primary" @click="toCreate">
            <template #icon>
              <i class="adicon ad-plus"></i>
            </template>
          </el-button>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="80" align="center" />
      <el-table-column :label="$l('Org ID')" prop="orgId" width="100" />
      <el-table-column :label="$l('Org')" prop="orgName" width="200" />
      <el-table-column :label="$l('App')" prop="app" width="200">
        <template #default="{ row }">
          <div class="flexMode vc">
            <div class="w32 h32 radius4 bg-dark3"></div>
            <span class="pl4 fs12 txt-dark9">{{ row.appName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$l('App Token')" prop="appToken" width="100" />
      <el-table-column :label="$l('Status')" prop="status" width="100" />
      <el-table-column :label="$l('MMP')" prop="mmp" width="100" />
      <el-table-column
        :label="$l('MMP Timezone')"
        prop="mmpTimezone"
        width="160"
      />
      <el-table-column :label="$l('Timezone')" prop="timezone" width="120" />
      <el-table-column
        :label="$l('Tracker Token')"
        prop="trackerToken"
        width="200"
      />
      <el-table-column :label="$l('Revenue')" prop="revenue" width="200" />
      <el-table-column :label="$l('Start Date')" prop="startDate" width="120" />
      <el-table-column :label="$l('Send Date')" prop="sendDate" width="120" />
      <el-table-column :label="$l('Send Time')" prop="sendTime" width="120" />
      <el-table-column :label="$l('Last Time')" prop="lastTime" width="120" />
      <el-table-column label="-" />
      <el-table-column :label="$l('Operation')" fixed="right" width="160">
        <template #default="{ row }">
          <div class="flexMode vc">
            <div class="mgbtn circle24">
              <i class="adicon ad-edit"></i>
            </div>
            <div class="mgbtn circle24 red">
              <i class="adicon ad-stop-circle txt-red"></i>
            </div>
            <div class="mgbtn circle24 green">
              <i class="adicon ad-play-circle txt-green"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </Table>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'MMPSetting',
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
      appName: 'App Name ' + id,
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
