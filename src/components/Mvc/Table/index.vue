<template>
  <div class="MvcTable" v-loading="state.loading">
    <div v-if="prop.useFilter" class="tableTopArea flexMode hr">
      <el-tooltip :content="$l('表格列自定义')" placement="top">
        <el-button circle size="mini" @click="toSetTable">
          <i class="adicon ad-config" />
        </el-button>
      </el-tooltip>
    </div>
    <el-table
      ref="table"
      :class="[
        prop.borderTop ? 'borderTop' : '',
        prop.borderBottom ? '' : 'noBottomBorder',
      ]"
      size="small"
      :data="state.dt.list"
      highlight-current-row
      :height="state.tableHeight"
      v-bind="$attrs"
      @selection-change="selectionChange"
      @row-click="rowClick"
    >
      <TableColumnFilter ref="tableColumnFilter">
        <slot />
      </TableColumnFilter>
    </el-table>
    <div v-if="state.pagination" class="flexMode hr p10">
      <el-pagination
        background
        locale="zh-CN"
        :page-size="state.pageSize"
        :total="state.dt.total || 0"
        layout="total, sizes, slot, prev, pager, next, slot, jumper"
        :page-sizes="[20, 50, 100, 200, 500]"
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
      :column-options="state.columnOptions"
      @configSubmit="configSubmit"
    />
  </div>
</template>
<script setup>
import TableColumnFilter from './TableColumnFilter.js';
import TableColumnConfig from './TableColumnConfig.vue';
defineOptions({
  name: 'MvcTable',
});
// 传参
const prop = defineProps({
  list: {
    // 没有分页时，用list填充数据
    type: [Array, String],
    default: '',
  },
  height: {
    type: [Number, String],
    default: 0,
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
  useFilter: {
    // 可显隐列
    type: Boolean,
    default: true,
  },
});
// 数据
const state = reactive({
  table: null,
  pageNum: 1,
  pageSize: 20,
  loading: false,
  dt: { pageNum: 1, list: [], total: null },
  tableHeight: 0,
  pagination: true,
  search: {},
  drawer: [
    {
      title: '表格列自定义',
      cpt: TableColumnConfig,
    },
  ],
  currentDrawer: '',
  columnOptions: [],
});
// 表格高度一页适配
let height =
  parseInt(prop.height) || document.body.clientHeight - 56 - 4 - 32 - 20;
height = height - parseInt(prop.minusHeight);
if (prop.useFilter) {
  height -= 40;
}
state.tableHeight = height;

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
const updateTableData = (v, i) => {
  if (i >= 0) {
    state.dt.list[i] = v;
  } else {
    // 传入-1则向最前面插入
    state.dt.list.unshift(v);
  }
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
  const columnOptions = proxy.$refs.tableColumnFilter.getColumnOptions();
  state.columnOptions = columnOptions;
  state.drawer[0].title = proxy.$l(state.drawer[0].title);
  state.currentDrawer = 0;
};

const configSubmit = (v) => {
  proxy.$refs.tableColumnFilter.initColumns();
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
