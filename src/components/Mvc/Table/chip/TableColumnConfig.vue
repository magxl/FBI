<template>
  <DrawerArea :loading="state.submiting" noscroll>
    <div class="relative flexMode vs p10 hp100">
      <!-- fixed left -->
      <div class="relative dragArea wp33 mr5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 radius-t8 border-b">
          <span class="fs14">{{ $l('Fixed Left') }}</span>
          <div v-if="leftVisible">
            <span class="fs12 txt-primary">{{ leftVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.left.length === 0" class="absCenter fs12">
          {{ $l('No Fixed Left') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.left"
            group="columnFilter"
            class="dragBody p5-0"
            :style="bodyStyle"
            :item-key="(k) => k"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <DragItem
                :it="it"
                :index="index"
                type="left"
                :lang="lang"
                @add-right="leftToCenter"
              />
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <!-- ↑ fixed left ↑ -->
      <!-- fixed center -->
      <div class="relative dragArea wp33 m0-5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 border-b radius-t8">
          <span class="fs14">{{ $l('Center') }}</span>
          <div v-if="centerVisible">
            <span class="fs12 txt-primary">{{ centerVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.center.length === 0" class="absCenter fs12">
          {{ $l('No Center') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.center"
            group="columnFilter"
            class="dragBody p5-0"
            :style="bodyStyle"
            :item-key="(k) => k"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <DragItem
                :it="it"
                :index="index"
                @add-left="toAddLeft"
                :lang="lang"
                @add-right="toAddRight"
                @change="toEdit"
              />
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <!-- ↑ fixed center ↑ -->
      <!-- fixed right -->
      <div class="relative dragArea wp33 ml5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 border-b radius-t8">
          <span class="fs14">{{ $l('Fixed Right') }}</span>
          <div v-if="rightVisible">
            <span class="fs12 txt-primary">{{ rightVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.right.length === 0" class="absCenter fs12">
          {{ $l('No Fixed Right') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.right"
            group="columnFilter"
            class="dragBody p5-0"
            :style="bodyStyle"
            :item-key="(k) => k"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <DragItem
                :it="it"
                :index="index"
                type="right"
                :lang="lang"
                @add-left="rightToCenter"
              />
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <!-- ↑ fixed right ↑ -->
    </div>
    <template #footer>
      <el-button @click="toReset" :loading="state.reseting">
        <template #icon>
          <i class="adicon ad-refresh"></i>
        </template>
        <span>{{ $l('Reset') }}</span>
      </el-button>
      <el-button @click="toSubmit" :loading="state.submiting" plain type="primary">
        <template #icon>
          <i class="adicon ad-upload"></i>
        </template>
        <span>{{ $l('Submit') }}</span>
      </el-button>
    </template>
  </DrawerArea>
  <!-- ↑ body ↑ -->
</template>
<script setup>
import Draggable from 'vuedraggable';
import DragItem from './DragItem.vue';
defineOptions({
  name: 'TableColumnConfig',
  components: { Draggable, DragItem },
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  submiting: false,
  reseting: false,
  columns: {
    left: [],
    center: [],
    right: [],
  },
  total: 0,
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 初始
const init = () => {
  const localColumns = JSON.parse(localStorage.getItem(columnName.value));
  const columns = {
    left: [],
    center: [],
    right: [],
  };
  localColumns.forEach((it) => {
    if (it.fixed) {
      columns[it.fixed].push(it);
    } else {
      columns.center.push(it);
    }
  });
  state.columns = columns;
  state.total = localColumns.length;
};
// 挂载
onMounted(() => {
  init();
  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  };
});
// 事件
const emit = defineEmits();
const createColumn = ({ left, center, right }) => {
  const rl = left.map((it, i) => {
    it.sort = i;
    it.fixed = 'left';
    return it;
  });
  const rc = center.map((it, i) => {
    it.sort = 100 + i;
    delete it.fixed;
    return it;
  });
  const rr = right.map((it, i) => {
    it.sort = 1000 + i;
    it.fixed = 'right';
    return it;
  });
  const column = [...left, ...center, ...right];
  const filterColumn = {
    left: rl,
    center: rc,
    right: rr,
  };
  return {
    column,
    filterColumn,
  };
};
const toReset = () => {
  state.reseting = true;
  localStorage.removeItem(columnName.value);
  emit('config-submit');
  getLocalColumn();
  state.reseting = false;
  emit('close');
};
const toSubmit = () => {
  state.submiting = true;
  const { column } = createColumn(state.columns);
  localStorage.setItem(columnName.value, JSON.stringify(column));
  emit('config-submit');
  state.submiting = false;
  emit('close');
};
const getLocalColumn = () => {
  proxy.$setTimeout(() => {
    if (!localStorage.getItem(columnName.value)) {
      getLocalColumn();
    } else {
      init();
      state.loading = false;
    }
  }, 500);
};
const toAddLeft = ({ it, index, type }) => {
  state.columns.left.push(it);
  state.columns.center.splice(index, 1);
};
const toAddRight = ({ it, index, type }) => {
  state.columns.right.push(it);
  state.columns.center.splice(index, 1);
};
const leftToCenter = ({ it, index, type }) => {
  state.columns.center.push(it);
  state.columns.left.splice(index, 1);
};
const rightToCenter = ({ it, index, type }) => {
  state.columns.center.push(it);
  state.columns.right.splice(index, 1);
};
const toEdit = ({ it, index, type }) => {
  state.columns[type][index] = it;
};
const onStart = (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  // e.dataTransfer = e.originalEvent.dataTransfer;
};
const onEnd = (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  // e.dataTransfer = e.originalEvent.dataTransfer;
};
// 计算属性
const leftVisible = computed(() => {
  return state.columns.left.filter((it) => it.visible).length;
});
const centerVisible = computed(() => {
  return state.columns.center.filter((it) => it.visible).length;
});
const rightVisible = computed(() => {
  return state.columns.right.filter((it) => it.visible).length;
});
const columnName = computed(() => {
  return prop.params.tableName + '_Column';
});
const scrollStyle = computed(() => {
  return {
    height: `calc(100% - 40px)`,
  };
});
const bodyStyle = computed(() => {
  return {
    height: launch.options.drawerHeight - 16 - 40 - 10 + 'px',
  };
});
const lang = computed(() => {
  return window.$getLang();
});
// 监听
// 卸载
</script>
<style lang="scss" scoped>
.dragBody {
  height: 100%;
}
</style>
