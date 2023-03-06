<template>
  <div v-loading="loading" class="VsTable" :style="tableHeight">
    <TableTool
      ref="tableTool"
      :table-name="prop.tableName"
      :tool="prop.tool"
      :top-show="topShow"
      v-bind="$attrs"
      @tool-event="toolEvent"
    >
      <slot v-if="slots.actions" name="actions" />
      <template v-if="slots.filter" #filter>
        <slot name="filter" />
      </template>
    </TableTool>
    <el-table
      ref="table"
      :key="state.tableKey"
      :data="state.list"
      :height="height"
      v-bind="$attrs"
      :class="[prop.borderTop && 'border-t']"
    >
      <TableColumnFilter
        ref="tableColumnFilter"
        :table-name="prop.tableName"
        :deep="prop.deep"
      >
        <slot />
      </TableColumnFilter>
    </el-table>
    <Drawer
      v-model:current="state.currentDrawer"
      :drawer="state.drawer"
      @config-submit="configSubmit"
    />
  </div>
</template>
<script setup>
import TableTool from '../Table/chip/TableTool.vue';
import TableColumnFilter from '../Table/chip/TableColumnFilter.js';
import TableColumnConfig from '../Table/chip/TableColumnConfig.vue';

// 定义
defineOptions({
  name: 'VsTable',
  components: { TableTool, TableColumnFilter, TableColumnConfig },
});
// 传参
const prop = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
  tool: {
    type: [Object, Boolean],
    default: () => {},
  },
  tableName: {
    type: String,
    default: '',
  },
  list: {
    type: Array,
    default: () => [],
  },
  height: {
    type: [Number, String],
    default: 0,
  },
  minusHeight: {
    type: [Number, String],
    default: 0,
  },
  borderTop: {
    type: Boolean,
    defualt: false,
  },
  rowHeight: {
    type: [Number, String],
    default: 40,
  },
  limit: {
    type: [Number, String],
    default: 100,
    validator: (v) => {
      // 性能约束
      return v <= 500 && v >= 10;
    },
  },
});
// 数据
const state = reactive({
  list: [],
  start: 0, // 显示区域索引
  end: 0, // 显示区域索引
  offsetPage: null,
  drawer: [
    {
      title: 'Tabel Column Customization',
      cpt: TableColumnConfig,
      size: 800,
      params: {
        tableName: prop.tableName,
      },
    },
  ],
  currentDrawer: '',
  tableKey: 0,
});
const store = inject('store');
const launch = store.launch();
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  // 监听滚动
  tableScrollListener();
});
// 事件
const emit = defineEmits();
const tableScrollListener = () => {
  nextTick(() => {
    proxy.$refs.table.$refs.scrollBarRef.wrap$.addEventListener(
      'scroll',
      scrolling,
    );
  });
};
const scrolling = (e) => {
  const { scrollTop, clientHeight } = e.target;
  const offsetRow = parseInt(scrollTop / rowHeight.value);
  // 滚动后页码
  const offsetPage = Math.ceil(offsetRow / limit.value);
  if (offsetPage > state.offsetPage) {
    state.offsetPage = offsetPage;
    // 显示下方
    if (
      scrollTop + clientHeight < totalHeight.value &&
      offsetRow > state.start + limit.value
    ) {
      // 没有触底时, 翻页
      let minus = limit.value;
      if (total.value - state.end < limit.value) {
        // 不足一页
        minus = total.value - state.end;
      }
      state.start += minus;
      state.end += minus;
    }
  } else if (offsetPage < state.offsetPage) {
    // 显示上方
    state.offsetPage = offsetPage;

    if (scrollTop > 0 && offsetRow < state.start + limit.value) {
      let minus = limit.value;
      if (state.start < limit.value) {
        // 不足一页
        minus = state.start;
      }
      state.start -= minus;
      state.end -= minus;
    }
  }
};

const toolEvent = (v) => {
  switch (v) {
    case 'download':
      if (prop.remoteDownload) {
        prop.remoteDownload();
      } else {
        toDownload();
      }
      emit('download');
      break;
    case 'refresh':
      refreshTable();
      emit('refresh');
      break;
    case 'config':
      toSetTable();
      break;
  }
};

// 下载
const toDownload = () => {
  // 过滤可导出列
  const columns = proxy.$refs.tableColumnFilter
    .getColumns()
    .filter((it) => it.visible && it.prop);
  // 列标题
  const thead = columns.map((it) => it.label);
  // 列主体
  const selection = proxy.$refs.table.getSelectionRows();
  // 有选中时，只导出选中数据
  const r = selection.length ? selection : prop.list;
  const tbody = r.map((it) => {
    const row = [];
    columns.forEach((ft) => {
      row.push(`"${it[ft.prop]}"`);
    });
    return row.join(',');
  });
  tbody.unshift(thead.join(','));
  const dt = tbody.join('\n');
  // 列数据流化
  const blob = new Blob(['\ufeff' + dt], { type: 'text/csv,charset=UTF-8' });
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a');
    elink.download =
      prop.tableName +
      '_' +
      window.$moment().format('YYYY-MM-DD_hh:mm:ss') +
      '.csv';
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
    navigator.msSaveBlob(blob, filename);
  }
};
// 配置表格显隐列
const toSetTable = () => {
  state.drawer[0].title = proxy.$l(state.drawer[0].title);
  state.currentDrawer = 0;
};
const configSubmit = (v) => {
  // proxy.$refs.tableColumnFilter.initColumns();
  refreshTable();
};
const refreshTable = () => {
  unlisterner();
  state.tableKey++;
  tableScrollListener();
};
const unlisterner = () => {
  proxy.$refs.table?.$refs.scrollBarRef.wrap$.removeEventListener(
    'scroll',
    scrolling,
  );
};

// 关闭filter面板
const toCloseFilter = () => {
  proxy.$refs.tableTool.toCloseFilter();
};

// 计算属性
const loading = computed(() => {
  return state.offsetPage === null || prop.loading;
});
const slots = computed(() => {
  return proxy.$slots;
});
const topShow = computed(() => {
  return prop.tool !== false || slots.actions || false;
});
const total = computed(() => {
  return prop.list.length;
});
const totalHeight = computed(() => {
  return total.value * rowHeight.value;
});
const rowHeight = computed(() => {
  return Number(prop.rowHeight) || 40;
});
const limit = computed(() => {
  return Number(prop.limit) || 10;
});
const height = computed(() => {
  let r;
  if (prop.height) {
    r = parseInt(prop.height);
  } else {
    r = launch.options.pageHeight;
  }
  if (prop.minusHeight) {
    r -= parseInt(prop.minusHeight);
  }
  if (topShow.value) {
    r -= window.global.config.table.tool;
  }
  return r;
});
const tableHeight = computed(() => {
  return {
    height: height.value + 'px',
  };
});
// 监听
watchEffect(() => {
  // 初始
  state.tableKey++;
  const rows = Math.ceil(height.value / rowHeight.value) + limit.value;
  state.start = 0;
  state.end = rows;
  state.offsetPage = 0;
});
watchEffect(() => {
  // 占位padding
  // state.list = prop.list.slice(state.start, state.end);
  if (prop.list.length) {
    state.list = prop.list.slice(state.start, state.end);

    // const worker = webworker.init('tableList');
    // worker.onmessage = (r) => {
    //   state.list = JSON.parse(r.data);
    // };
    // state.list = worker.postMessage({
    //   start: state.start,
    //   end: state.end,
    //   list: prop.list,
    // });
  }
  if (proxy.$refs.table) {
    proxy.$refs.table.$refs.tableBody.style.paddingTop =
      state.start * rowHeight.value + 'px';
    proxy.$refs.table.$refs.tableBody.style.paddingBottom =
      (total.value - state.end) * rowHeight.value + 'px';
  }
});
// 卸载
defineExpose({
  toCloseFilter,
  refreshTable,
});
onUnmounted(() => {
  unlisterner();
});
// Map
</script>
<style lang="scss" scoped></style>
