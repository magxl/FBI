<template>
  <Page class="Monitors">
    <Table
      ref="table"
      minus-height="-48"
      :load-data="loadData"
      table-name="Monitors"
    >
      <template #actions>
        <div class="flexMode vc p0-16">
          <span>{{ $l('Monitors') }}</span>
          <div class="p16 pr0 mr16 border-r"></div>
          <el-button type="primary" plain circle @click="toCreate">
            <template #icon>
              <i class="adicon ad-plus1"></i>
            </template>
          </el-button>
        </div>
      </template>
      <el-table-column
        type="selection"
        width="56"
        align="center"
        fixed="left"
      />
      <el-table-column label="ID" prop="id" width="100" fixed="left" />
      <el-table-column :label="$l('Type')" prop="type" width="120" sortable>
        <template #default="{ row }">
          <div
            class="radius4 p4-8 fs10-l inline-block txt-nowrap"
            :class="[typeMap[row.type].txt, typeMap[row.type].bg]"
          >
            {{ typeMap[row.type].label }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Name')"
        prop="name"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$l('Campaign Group ID')"
        prop="orgId"
        width="160"
      />
      <el-table-column
        :label="$l('Campaign Group')"
        prop="orgName"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column :label="$l('Status')" prop="status" width="100">
        <template #default="{ row }">
          <div class="flexMode vc">
            <div class="dot8" :class="statusMap[row.status].bg"></div>
            <div class="pl8 txt-dark5">{{ $l(statusMap[row.status].label) }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$l('Start Run')" prop="startRun" width="140" />
      <el-table-column :label="$l('Last Run')" prop="lastRun" width="140" />
      <el-table-column :label="$l('End Run')" prop="endRun" width="140" />
      <el-table-column label="-" />

      <el-table-column :label="$l('Operation')" fixed="right" width="160">
        <template #default="{ row, $index }">
          <div class="flexMode vc">
            <div class="mgbtn mr8 circle24" @click="toLogs(row, $index)">
              <i class="adicon ad-list fs20"></i>
            </div>
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
import Create from './Monitors/Create.vue';
import Logs from './Monitors/Logs.vue';
defineOptions({
  name: 'Monitors',
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
    {
      title: '',
      size: 800,
      cpt: Logs,
    },
  ],
});
const { proxy } = getCurrentInstance();
// 计算属性
const typeMap = computed(() => {
  return {
    keywords: {
      label: 'Keywords',
      txt: 'txt-primary',
      bg: 'bg-primary1',
    },
    searchTerm: {
      label: 'Search Term',
      txt: 'txt-orange',
      bg: 'bg-orange1',
    },
    cpa: {
      label: 'CPA',
      txt: 'txt-green',
      bg: 'bg-green1',
    },
    cpt: {
      label: 'CPT',
      txt: 'txt-purple',
      bg: 'bg-purple1',
    },
  };
});
const statusMap = computed(() => {
  return {
    0: {
      label: '暂停',
      value: 0,
      bg: 'bg-orange',
    },
    1: {
      label: '运行',
      value: 1,
      bg: 'bg-green',
    },
  };
});
// 监听

// 挂载

// 事件

const toCreate = () => {
  state.drawer[0].title = window.$l('Create Monitor');
  state.drawer[0].params = {};
  state.currentDrawer = 0;
};
const toEdit = (row, i) => {
  state.drawer[0].title = window.$l('Update Monitor');
  state.drawer[0].params = { row, i };
  state.currentDrawer = 0;
};
const toLogs = (row) => {
  state.drawer[1].title = window.$l('Monitor Logs');
  state.drawer[1].params = { row };
  state.currentDrawer = 1;
};
const toToggleStatus = (row, i) => {
  proxy.$refs.table.editRow({ row: { loading: true }, i });

  proxy.$setTimeout(() => {
    const status = row.status === 1 ? 0 : 1;
    proxy.$refs.table.editRow({ row: { status, loading: false }, i });
  }, window.$randomNumber(2000, 300));
};
const loadData = async (v) => {
  const types = Object.keys(typeMap.value);
  const list = window.$fakeData(v.pageSize, (i) => {
    const id = (v.pageNum - 1) * v.pageSize + i;
    const type = types[window.$randomNumber(4)];
    return {
      id,
      name: 'name' + id,
      type,
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
