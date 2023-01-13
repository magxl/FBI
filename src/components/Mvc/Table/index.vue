<template>
  <div class="MvcTable" v-loading="state.loading">
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
    >
      <TableColumnFilter
        ref="tableColumnFilter"
        :table-name="prop.tableName"
        :deep="prop.deep"
      >
        <slot />
      </TableColumnFilter>
    </el-table>
    <div
      v-if="pagination"
      class="relative h48 p10 bg-white backdrop z2 border-t"
    >
      <el-pagination
        background
        small
        :page-size="state.pageSize"
        :total="state.dt.total || 0"
        layout="sizes, slot, ->, prev, pager, next, jumper"
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
import { reactive } from 'vue';
// 数据
const { proxy } = getCurrentInstance();
// 传参
const prop = defineProps({
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
  deep: {
    type: Boolean,
    default: false,
  },
  pageSizes: {
    type: Array,
    default: () => {
      return [20, 50, 100, 200, 300, 500, 1000];
    },
  },
});
const state = reactive({
  height: 0,
  timer: null,
  pageNum: 1,
  pageSize: 100,
  loading: false,
  tableKey: 0,
  dt: { pageNum: 1, list: [], total: null },
  filter: {
    list: [],
    total: null,
  },
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
});

// 计算属性

const slots = computed(() => {
  return proxy.$slots;
});
const topShow = computed(() => {
  return prop.tool !== false || slots.actions || false;
});
const pagination = computed(() => {
  return window.$getType(prop.list) !== 'Array';
});
// 挂载
onMounted(() => {
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    initHeight();
  }, 500);
});
// 事件
const initHeight = () => {
  let height = Number(prop.height) || document.body.clientHeight - 48 - 32 - 48;

  height = height - Number(prop.minusHeight);
  height = topShow && (height -= 56);
  height = pagination && (height -= 56);
  state.height = height;
};

const initTable = (v) => {
  state.search = v;
  const { pageSize, pageNum } = v;
  pageNum && (state.pageNum = pageNum);
  pageSize && (state.pageSize = pageSize);
  window.$reset(proxy, 'dt');
  getData();
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
// 配置表格显隐列
const toSetTable = () => {
  state.drawer[0].title = proxy.$l(state.drawer[0].title);
  state.currentDrawer = 0;
};
const filterSubmit = (v) => {
  // proxy.$refs.tableColumnFilter.initColumns();
  state.tableKey++;
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
  console.info(row, i);
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
});
// 监听
watch(
  () => pagination,
  (n) => {
    if (n) {
      getData();
    }
  },
  {
    immediate: true,
  },
);
// 卸载
</script>
<style lang="scss" scoped></style>
