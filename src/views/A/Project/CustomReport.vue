<template>
  <Page title="Custom Report" class="CustomReport">
    <Table ref="table" :load-data="loadData">
      <template #actions>
        <div class="flexMode vc p0-16">
          <div class="btns">
            <el-button
              size="small"
              circle
              plain
              type="primary"
              @click="toCreate"
            >
              <template #icon>
                <i class="adicon ad-plus1"></i>
              </template>
            </el-button>
            <el-button
              size="small"
              round
              plain
              type="primary"
              @click="toExportKeyword"
              >Export Keyword</el-button
            >
            <el-button
              size="small"
              round
              plain
              type="primary"
              @click="toExportAdSetting"
              >Export Ad Setting</el-button
            >
          </div>
          <div class="w240 pl8">
            <el-input
              v-model="state.filter.Name"
              clearable
              :placeholder="$l('Name')"
              size="small"
              class="wp100"
              @keydown.enter="toFilter"
              @clear="toFilter"
            >
              <template #prefix>
                <i class="adicon ad-filter1"></i>
              </template>
              <template #append>
                <el-button size="small">
                  <template #icon>
                    <i class="adicon ad-search1"></i>
                  </template>
                </el-button>
              </template>
            </el-input>
          </div>
        </div>
      </template>
      <el-table-column label="ID" prop="ID" width="120" align="center" />
      <el-table-column
        :label="$l('Name')"
        prop="Name"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column :label="$l('Create By')" prop="CreateBy" width="100" />
      <el-table-column
        :label="$l('Create Time')"
        prop="CreateTime"
        width="160"
      />
      <el-table-column label="-" />
      <el-table-column :label="$l('Operation')" width="160">
        <template #default="{ row, $index }">
          <div class="flexMode vc">
            <div
              v-loading="row.downloading"
              class="mgbtn circle30"
              @click="toDownload(row, $index)"
            >
              <i class="adicon ad-download1"></i>
            </div>
            <div class="mgbtn circle30 blue" @click="toEdit">
              <i class="adicon ad-edit"></i>
            </div>
            <div class="mgbtn circle30 orange" @click="toViewChart">
              <i class="adicon ad-linechart"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </Table>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </Page>
</template>
<script setup>
import Chart from './CustomReport/Chart.vue';
import Create from './CustomReport/Create.vue';
// 定义
defineOptions({
  name: 'CustomReport',
});
// 数据
const state = reactive({
  filter: {},
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 800,
      cpt: Chart,
    },
    {
      title: '',
      size: 600,
      cpt: Create,
    },
  ],
});
const { proxy } = getCurrentInstance();
// 计算属性

// 监听

// 挂载

// 事件
const loadData = async () => {
  const total = 30;
  const list = window.$fd(total, (i) => {
    const index = i + 1;
    return {
      ID: window.$rn(8888888, 1111111),
      Name: 'Report Name ' + index,
      CreateBy: 'Create By ' + index,
      CreateTime: window
        .$moment()
        .add(window.$rn(0, 10), 'day')
        .format('YYYY-MM-DD hh:mm:ss'),
    };
  });
  return {
    list,
    total,
  };
};

const toCreate = () => {
  state.drawer[1].title = window.$l('Create Custom Report');
  state.currentDrawer = 1;
};
const toExportKeyword = () => {};
const toExportAdSetting = () => {};
const toDownload = (row, i) => {
  proxy.$refs.table.editRow({ i, row: { downloading: true } });
  state.timer = setTimeout(() => {
    proxy.$refs.table.editRow({ i, row: { downloading: false } });
  }, window.$rn(3000, 200));
};
const toEdit = () => {};
const toViewChart = () => {
  state.drawer[0].title = window.$l('Custom Report Chart');
  state.currentDrawer = 0;
};
const toFilter = () => {
  proxy.$refs.table.toFilter({ v: state.filter });
};
// 卸载
</script>
<style lang="scss" scoped></style>
