<template>
  <div class="MvcTable" v-loading="loading">
    <TableTool
      :table-name="prop.tableName"
      :tool="prop.tool"
      :top-show="topShow"
      @tool-event="toolEvent"
    >
      <slot name="actions" />
    </TableTool>
    <el-table
      ref="table"
      :key="state.tableKey"
      :data="state.dt.list"
      :height="state.height"
      :class="borderTop && 'border-t'"
      :empty-text="emptyTxt"
      v-bind="$attrs"
    >
      <TableColumnFilter
        ref="tableColumnFilter"
        :table-name="prop.tableName"
        :deep="prop.deep"
      >
        <slot />
      </TableColumnFilter>
    </el-table>
    <div class="relative h48 p10 bg-white backdrop z2 border-t">
      <el-pagination
        background
        small
        :page-size="state.pageSize"
        :total="state.dt.total || 0"
        :layout="layout"
        :page-sizes="pageSizes"
        :pager-count="Number(state.pagerCount) || 7"
        :current-page.sync="state.pageNum"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <div class="flexMode vc fs14">
          <div class="txt-dark3 pr5">Total</div>
          <div
            v-show="state.filter.total !== state.dt.total"
            class="txt-primary5"
          >
            {{ state.filter.total }}
          </div>
          <div
            v-show="state.filter.total !== state.dt.total"
            class="p0-5 txt-dark3"
          >
            /
          </div>
          <div>{{ state.dt.total }}</div>
        </div>
      </el-pagination>
    </div>
    <Drawer
      v-model:current="state.currentDrawer"
      :drawer="state.drawer"
      @filter-submit="filterSubmit"
    />
  </div>
</template>
<script setup>
import TableTool from './chip/TableTool.vue';
import TableColumnFilter from './chip/TableColumnFilter.js';
import TableColumnConfig from './chip/TableColumnConfig.vue';
defineOptions({
  name: 'MvcTable',
  components: { TableTool, TableColumnFilter },
});
// 数据
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
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
    type: [Array, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: 0,
  },
  minusHeight: {
    type: [Number, String],
    default: 0,
  },
  loadData: {
    type: Function,
    default: () => {},
  },
  borderTop: {
    type: Boolean,
    default: true,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  deep: {
    type: Boolean,
    default: false,
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [20, 50, 100, 200, 300, 500];
    },
  },
});
const state = reactive({
  height: 0,
  timer: null,
  pageNum: 1,
  pageSize: 100,
  loading: true,
  tableKey: 0,
  dt: { list: [], total: null },
  filter: {
    list: [],
    total: null,
  },
  search: {},
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
});

// 计算属性
const loading = computed(() => {
  return mode.value === 'list' ? prop.loading : state.loading;
});
const slots = computed(() => {
  return proxy.$slots;
});
const topShow = computed(() => {
  return prop.tool !== false || slots.actions || false;
});
const staticTable = computed(() => {
  const now = +new Date();
  // 没有传入list ? 动态表格 : 静态表格
  return !prop.list ? String(now) : now;
});
const mode = computed(() => {
  const type = window.$getType(staticTable.value);
  return type === 'String' ? 'loadData' : 'list';
});
const layout = computed(() => {
  return window.$getType(staticTable.value) === 'String'
    ? 'sizes, slot, ->, prev, pager, next, jumper'
    : 'slot';
});
const emptyMap = computed(() => {
  return window.$map.common.emptyMap;
});
const emptyTxt = computed(() => {
  return emptyMap[launch.lang];
});
// 挂载
onMounted(() => {
  clearTimeout(state.timer);
  const { frame, page, table } = window.global.config;
  // 减去高度          页头 48 间距 4+4  分页48  Frame56

  const staticMinus =
    table.pagination +
    page.header +
    page.paddingTop +
    page.paddingBottom +
    frame.header;
  state.timer = setTimeout(() => {
    initHeight(staticMinus);
  }, 500);
});
// 事件
const emit = defineEmits();
const initHeight = (staticMinus) => {
  let height = Number(prop.height) || document.body.clientHeight - staticMinus;

  height = height - Number(prop.minusHeight);
  height = topShow && (height -= 48);
  // height = pagination && (height -= 56);
  state.height = height;
};

const initTable = (v) => {
  state.search = v;
  const { pageSize, pageNum } = v;
  pageNum && (state.pageNum = pageNum);
  pageSize && (state.pageSize = pageSize);
  state.dt = {
    list: [],
    total: null,
  };
  getData();
};
const refreshTable = () => {
  state.tableKey++;
};

const getData = async (v) => {
  if (prop.loadData) {
    state.loading = true;
    try {
      v = {
        pageNum: state.pageNum,
        pageSize: state.pageSize,
        ...state.search,
        ...v,
      };
      state.pageSize = v.pageSize;
      state.pageNum = v.pageNum;
      const dt = await prop.loadData(v);
      state.dt = dt;
      state.filter = JSON.parse(JSON.stringify(dt));
      state.loading = false;
    } catch {
      //
    }
    initScroll();
  }
};
const initList = () => {
  const dt = {
    list: prop.list,
    total: prop.list.length,
  };
  state.dt = dt;
  state.filter = JSON.parse(JSON.stringify(dt));
  state.loading = false;
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
      initTable();
      emit('refresh');
      break;
    case 'filter':
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
  const r = selection.length ? selection : state.dt.list;
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
const filterSubmit = (v) => {
  // proxy.$refs.tableColumnFilter.initColumns();
  refreshTable();
};
const toFilter = ({ v = {}, mode = 'fuzzy', type = 'and' }) => {
  /* 
        mode: exact|fuzzy
        v= [
          {
            key: 'id',
            value: '1'
          }
        ]
      */
  const filterKeysArr = Object.keys(v);
  const filterKeys = [];
  filterKeysArr.forEach((it) => {
    // 过滤空值搜索
    const filterValue = v[it];
    // const fvType = window.$getType(filterValue);
    if (filterValue && filterValue.length) {
      filterKeys.push(it);
    }
  });

  if (filterKeys.length) {
    if (mode === 'fuzzy') {
      if (type === 'and') {
        return AndFuzzyFilter(filterKeys, v);
      } else if (type === 'or') {
        return OrFuzzyFilter(filterKeys, v);
      }
    } else if (mode === 'exact') {
      return exactFilter(filterKeys, v);
    }
  } else {
    state.dt.list = [...state.filter.list];
    state.filter.total = state.dt.total;
    return state.filter.list;
  }
};
const exactFilter = (filterKeys, v) => {
  const list = [];
  state.filter.list.forEach((it) => {
    let need = false;
    filterKeys.forEach((fk) => {
      const filterValue = v[fk];
      if (filterValue === it[fk] || filterValue.indexOf(it[fk]) > -1) {
        need = true;
      }
    });
    if (need) {
      list.push(it);
    }
  });
  state.dt.list = list;
  state.filter.total = list.length;
  return list;
};
const AndFuzzyFilter = (filterKeys, v) => {
  const list = [];
  state.filter.list.forEach((it) => {
    let need = true;
    filterKeys.forEach((fk) => {
      const itValue = String(it[fk]);
      let filterValue = v[fk];
      const fvType = window.$getType(filterValue);
      if (fvType === 'Array') {
        filterValue = filterValue.map((fvt) => String(fvt));
        if (filterValue.indexOf(itValue) === -1) {
          need = false;
        }
        // filterValue.forEach((fkt) => {
        //   if (!itValue.includes(fkt)) {
        //     need = false;
        //   }
        // });
      } else if (!itValue.includes(filterValue)) {
        need = false;
      }
    });
    if (need) {
      list.push(it);
    }
  });
  state.dt.list = list;
  state.filter.total = list.length;
  return list;
};
const OrFuzzyFilter = (filterKeys, v) => {
  const list = [];
  state.filter.list.forEach((it) => {
    let need = false;
    filterKeys.forEach((fk) => {
      const itValue = String(it[fk]);
      const filterValue = v[fk];
      const fkType = window.$getType(filterValue);
      if (fkType === 'Array') {
        filterValue.forEach((fkt) => {
          if (itValue.includes(fkt)) {
            need = true;
          }
        });
      } else if (itValue.includes(filterValue)) {
        need = true;
      }
    });
    if (need) {
      list.push(it);
    }
  });
  state.dt.list = list;
  state.filter.total = list.length;
  return list;
};

// 初始化y滚动
const initScroll = () => {
  if (proxy.$refs.table) {
    proxy.$refs.table.setScrollTop(0);
  }
};
// 每页数量
const sizeChange = (v) => {
  state.pageSize = v;
  getData();
};
// 换页
const currentChange = (v) => {
  state.pageNum = v;
  getData();
};

// 编辑行数据
const editRow = ({ row = {}, i }) => {
  if (i === undefined) {
    state.dt.list.unshift(row);
  } else {
    state.dt.list[i] = {
      ...state.dt.list[i],
      ...row,
    };
  }
};

defineExpose({
  editRow,
  refreshTable,
  initTable,
  toFilter,
});
// 监听
watch(
  () => staticTable.value,
  (n) => {
    const type = window.$getType(n);
    if (type === 'String') {
      if (prop.immediate) {
        getData();
      } else {
        state.loading = false;
      }
    } else if (type === 'Number') {
      if (window.$getType(prop.list) === 'Array') {
        initList();
      } else {
        state.loading = true;
      }
    }
  },
  {
    immediate: true,
  },
);
// 卸载
</script>
<style lang="scss" scoped></style>
