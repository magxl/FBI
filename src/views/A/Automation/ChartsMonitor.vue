<template>
  <Page title="Charts Monitor" class="ChartsMonitor">
    <Table ref="table" :load-data="loadData" table-name="ChartsMonitor">
      <template #actions>
        <div class="flexMode p0-16">
          <el-button type="primary" plain circle @click="toCreate" size="small">
            <template #icon>
              <i class="adicon ad-plus1"></i>
            </template>
            <!-- <span>{{ $l('创建') }}</span> -->
          </el-button>
        </div>
      </template>
      <el-table-column
        label="ID"
        prop="id"
        width="100"
        fixed="left"
        align="center"
      />
      <el-table-column
        :label="$l('Country or Regions')"
        prop="country_or_regions"
        width="200"
      />
      <el-table-column :label="$l('Category')" prop="category" width="200" />
      <el-table-column
        :label="$l('New App Found')"
        prop="new_app_found"
        width="140"
      />
      <el-table-column :label="$l('Start Run')" prop="start_run" width="160" />
      <el-table-column :label="$l('Last Run')" prop="last_run" width="160" />
      <el-table-column :label="$l('End Run')" prop="end_run" width="160" />
      <el-table-column :label="$l('Status')" prop="status" width="80">
        <template #default="{ row }">
          <div class="flexMode vc">
            <div class="dot8" :class="statusOptions[row.status].bg"></div>
            <div class="pl8">{{ statusOptions[row.status].label }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="-" />
      <el-table-column :label="$l('操作')" fixed="right" width="160">
        <template #default="{ row, $index }">
          <div class="flexMode vc">
            <div class="mgbtn mr8 circle24" @click="toEdit(row, $index)">
              <i class="adicon ad-edit fs20"></i>
            </div>
            <el-popconfirm
              placement="top"
              title="Running The Monitor?"
              @confirm="toToggleStatus(row, $index)"
            >
              <template #reference>
                <div
                  v-if="row.status === 0"
                  v-loading="row.loading"
                  class="mgbtn mr8 circle24 green"
                >
                  <i class="adicon ad-play-circle txt-green7 fs20"></i>
                </div>
              </template>
            </el-popconfirm>
            <el-popconfirm
              placement="top"
              title="Paused The Monitor?"
              @confirm="toToggleStatus(row, $index)"
            >
              <template #reference>
                <div
                  v-if="row.status === 1"
                  v-loading="row.loading"
                  class="mgbtn mr8 circle24 red"
                >
                  <i class="adicon ad-stop-circle txt-red7 fs20"></i>
                </div>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </Table>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </Page>
</template>
<script setup>
import Create from './ChartsMonitor/Create.vue';
defineOptions({
  name: 'ChartsMonitor',
});
// 数据
const state = reactive({
  table: {
    total: 1000,
  },
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 800,
      cpt: Create,
    },
  ],
});
const { proxy } = getCurrentInstance();
// 计算属性
const statusOptions = computed(() => {
  return [
    {
      label: 'Paused',
      bg: 'bg-red',
      value: 0,
    },
    {
      label: 'Running',
      bg: 'bg-green',
      value: 1,
    },
  ];
});
// 监听

// 挂载

// 事件
const loadData = (v) => {
  const list = window.$fakeData(v.pageSize, (i) => {
    const id = (v.pageNum - 1) * v.pageSize + i;
    return {
      id,
      name: 'name' + id,
      status: window.$randomNumber(2),
    };
  });
  return {
    list,
    total: state.table.total,
  };
};
const toToggleStatus = (row, i) => {
  proxy.$refs.table.editRow({ row: { loading: true }, i });

  proxy.$setTimeout(() => {
    const status = row.status === 1 ? 0 : 1;
    proxy.$refs.table.editRow({ row: { status, loading: false }, i });
  }, window.$randomNumber(2000, 300));
};

const toCreate = () => {
  state.drawer[0].title = window.$l('Create Charts Monitor');
  state.drawer[0].params = {};
  state.currentDrawer = 0;
};
const toEdit = (row, i) => {
  state.drawer[0].title = window.$l('Update Charts Monitor');
  state.drawer[0].params = { row, i };
  state.currentDrawer = 0;
};
// 卸载
</script>
<style lang="scss" scoped></style>
