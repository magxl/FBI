<template>
  <div class="MvcTableNormal" v-loading="state.loading">
    <div v-if="topShow" class="h64 flexMode vc hb">
      <div class="flexGrow"><slot name="actions"></slot></div>
      <div v-if="prop.tool !== false" class="flexMode vc noShrink pr20">
        <template v-for="it in toolBtn">
          <div
            v-if="!it.hide"
            :key="it.action"
            class="mgbtn circle30"
            @click="toolEvent(it)"
          >
            <i :class="it.icon" class="fs20"></i>
          </div>
        </template>
      </div>
    </div>
    <el-table
      ref="table"
      :class="[
        prop.borderTop ? 'border-t' : '',
        prop.borderBottom ? 'border-b' : '',
      ]"
      :key="state.tableKey"
      :data="state.dt.list"
      :min-height="minHeight"
      :max-height="state.tableHeight"
      v-bind="$attrs"
      @selection-change="selectionChange"
      @row-click="rowClick"
    >
      <TableColumnFilter
        ref="tableColumnFilter"
        :table-name="prop.tableName"
        :deep="deep"
      >
        <slot name="default" />
      </TableColumnFilter>
    </el-table>
    <div
      v-if="state.pagination"
      class="relative flexMode hr h56 p10 bg-white9 backdrop z2"
    >
      <el-pagination
        background
        locale="zh-CN"
        :page-size="state.pageSize"
        :total="state.dt.total || 0"
        layout="total, sizes, slot, prev, pager, next, slot, jumper"
        :page-sizes="pageSizes"
        :pager-count="Number(state.pagerCount) || 7"
        :current-page.sync="state.pageNum"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <Drawer
      v-model:current="state.currentDrawer"
      :drawer="state.drawer"
      @filterSubmit="filterSubmit"
    />
  </div>
</template>
<script setup>
import TableColumnFilter from './TableColumnFilter.js';
import TableColumnConfig from './TableColumnConfig.vue';
defineOptions({
  name: 'MvcTableNormal',
  components: { TableColumnFilter },
});
// 传参
const prop = defineProps({
  tableName: {
    dtype: String,
    default: '',
  },
  deep: {
    // column是循环出来时，deep: true
    dtype: Boolean,
    default: false,
  },
  list: {
    // 没有分页时，用list填充数据
    type: [Array, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: 0,
  },
  minHeight: {
    type: [Number, String],
    default: 300,
  },
  minusHeight: {
    // 额外要减去的高度，为了表头额外布局设置
    type: [Number, String],
    default: 0,
  },
  loadData: {
    type: [Function, String],
    default: () => {
      return () => {};
    },
  },
  pagerCount: {
    type: [String, Number],
    default: 7,
  },
  borderTop: {
    // 顶部分隔线
    type: Boolean,
    default: true,
  },
  borderBottom: {
    // 底部分隔线
    type: Boolean,
    default: true,
  },
  relayout: {
    type: Boolean,
    default: false,
  },
  immediate: {
    // 是否立即请求数据
    type: Boolean,
    default: true,
  },
  tool: {
    type: [Object, Boolean],
    default: () => {},
  },
  setRowClass: {
    type: Function,
    default: () => {},
  },
  remoteDownload: {
    type: Function,
    default: null,
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [20, 50, 100, 200, 500, 1000, 2000, 5000];
    },
  },
});
// 数据
const state = reactive({
  table: null,
  pageNum: 1,
  pageSize: 20,
  loading: false,
  tableKey: 0,
  dt: { pageNum: 1, list: [], total: null },
  filter: {
    list: [],
    total: null,
  },
  tableHeight: 0,
  pagination: true,
  search: {},
  drawer: [
    {
      title: '表格列自定义',
      cpt: TableColumnConfig,
      size: 700,
      params: {
        tableName: prop.tableName,
      },
    },
  ],
  currentDrawer: '',
  columnOptions: [],
});

const { proxy } = getCurrentInstance();

const getData = async (v = {}) => {
  if (Object.toString.call(prop.loadData) === 'function _default() {}') {
    return;
  }
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
    dt.total = Number(dt.total); // 不能相信任何一个返回
    state.dt = dt;
    state.filter = JSON.parse(JSON.stringify(dt));

    state.loading = false;
  } catch {
    //
  }
  initScroll();
  return {
    pageNum: state.pageNum,
  };
};
// 计算属性
const slots = computed(() => {
  return proxy.$slots;
});
const topShow = computed(() => {
  return prop.tool !== false || proxy.$slots.actions || false;
});
const defaultTool = computed(() => {
  return {
    filter: true,
    download: true,
    print: true,
    refresh: true,
    ...prop.tool,
  };
});
const toolBtn = computed(() => {
  const { filter, download, print, refresh } = defaultTool.value;
  return [
    {
      label: 'Filter',
      icon: 'adicon ad-config1',
      action: 'filter',
      hide: !prop.tableName || !filter,
    },
    {
      label: 'Download',
      icon: 'adicon ad-download1',
      action: 'download',
      hide: !download,
    },
    {
      label: 'Refresh',
      icon: 'adicon ad-refresh',
      action: 'refresh',
      hide: prop.list || !refresh,
    },
  ];
});
const total = computed(() => {
  let t = 0;
  if (state.filter.total === state.dt.total) {
    t = state.dt.total;
  } else {
    t = state.filter.total + '/' + state.dt.total;
  }
  return t;
});
// 监听
watch(
  () => state.dt.pageNum,
  (n) => {
    if (n) {
      state.pageNum = parseInt(n);
    }
  },
  {
    immediate: true,
  },
);
watch(
  () => state.dt.total,
  (n) => {
    if (n) {
      if (prop.relayout) {
        clearTimeout(state.timer);
        state.timer = setTimeout(() => {
          doLayout();
        }, 500);
      }
    }
  },
  {
    immediate: true,
  },
);
// 是否使用静态列表
watch(
  () => prop.list,
  (n) => {
    if (n && n.length) {
      initList(n);
    } else {
      if (prop.immediate) {
        getData();
      }
    }
  },
  {
    immediate: true,
  },
);
// 初始化

// 表格高度一页适配
let height = parseInt(prop.height) || document.body.clientHeight - 56 - 32 - 56;
height = height - parseInt(prop.minusHeight);
height = topShow && (height -= 64);
state.tableHeight = height;

// 挂载
onMounted(() => {
  state.table = proxy.$refs.table;
  // 非立即请求的类型，在挂载时进行请求数据
  if (!prop.immediate) {
    getData();
  }
});
// 事件
const emit = defineEmits();
const initList = (n) => {
  state.pagination = false;
  state.dt = {
    list: n,
    total: n.length || 0,
  };
  state.loading = false;
};
// 初始化table数据，一般用在搜索
const initTable = (v) => {
  if (v) {
    state.pageNum = 1;
    delete v.pageNum;
    delete v.pageSize;
    state.search = v;
  } else {
    state.search = {};
  }
  getData(v);
};
// 删除行数据
const delTableData = (i) => {
  state.dt.list.slice(i, 1);
};
// 本地变更单行数据
const editRow = (p = {}, i) => {
  if (i >= 0) {
    state.dt.list[i] = {
      ...state.dt.list[i],
      ...p,
    };
  } else {
    // 无索引则向最前面插入
    state.dt.list.unshift(v);
  }
};

const toFilter = (v = {}, mode = 'fuzzy', type = 'and') => {
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
        AndFuzzyFilter(filterKeys, v);
      } else if (type === 'or') {
        fuzzyFilter(filterKeys, v);
      }
    } else if (mode === 'exact') {
      exactFilter(filterKeys, v);
    }
  } else {
    state.dt.list = [...state.filter.list];
    state.filter.total = state.dt.total;
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
};
const fuzzyFilter = (filterKeys, v) => {
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
};
// 换页
const currentChange = (v) => {
  state.pageNum = v;
  getData();
};
// 下一页
const nextPage = () => {
  const {
    dt: { total },
    pageSize,
    pageNum,
  } = state;
  const totalPage = Math.ceil(total / pageSize);
  const nextPageNum = pageNum + 1;
  if (totalPage >= nextPafeNum) {
    state.pageNum = nextPageNum;
    return getData();
  } else {
    return false;
  }
};

// 复选框选中
const selectionChange = (v) => {
  emit('selection-change', v);
};
// 设置高亮行
const setCurrentRow = (v) => {
  return state.table.setCurrentRow(getRow(v));
};
// 获取行数据
const getRow = (v) => {
  return state.table.data[v];
};
// 行点击回调
const rowClick = () => {
  emit('row-click', arguments);
};
// 初始化y滚动
const initScroll = () => {
  if (state.table) {
    state.table.setScrollTop(0);
  }
};
// 重新布局,防串行
const doLayout = () => {
  if (state.table) {
    state.table.doLayout();
  } else {
    console.error('此时还没有渲染出Table,请延迟执行doLayout');
  }
};

// 配置表格显隐列
const toSetTable = () => {
  state.drawer[0].title = proxy.$l(state.drawer[0].title);
  state.currentDrawer = 0;
};

const filterSubmit = (v) => {
  // proxy.$refs.tableColumnFilter.initColumns();
  state.tableKey = +new Date();
};

const toolEvent = (it) => {
  switch (it.action) {
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
const toDownload = () => {
  // 过滤可导出列
  const columns = proxy.$refs.TableColumnFilter.getColumns().filter(
    (it) => it.visible && it.prop,
  );
  // 列标题
  const thead = columns.map((it) => it.prop);
  // 列主体
  const selection = proxy.$refs.table.getSelectionRows();
  // 有选中时，只导出选中数据
  const r = selection.length ? selection : state.dt.list;
  const tbody = r.map((it) => {
    const row = [];
    thead.forEach((ft) => {
      row.push(`"${it[ft]}"`);
    });
    return row.join(',');
  });
  tbody.unshift(thead.join(','));
  const dt = tbody.join('\n');
  // 列数据流化
  const blob = new Blob(['\ufeff' + dt], { type: 'text/csv,charset=UTF-8' });
  if ('download' in document.createElement('a')) {
    const elink = document.createElement('a');
    elink.download = state.tableName + '_' + window.$getFullTime() + '.csv';
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

defineExpose({
  initTable,
  initScroll,
  doLayout,
});
// 卸载
</script>
<style lang="scss" scoped>
.tableTopArea {
  height: 40px;
  padding: 4px;
}
.borderTop {
  border-top: 1px solid $dark1;
}
</style>
